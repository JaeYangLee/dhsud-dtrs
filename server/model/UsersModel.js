const pool = require("../database/database");
const bcrypt = require("bcrypt");

const getUserById = async (user_id) => {
  const result = await pool.query(
    "SELECT user_id, first_name, middle_name, last_name, email, role, office_id, created_at FROM users WHERE user_id = $1",
    [user_id],
  );

  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT user_id, first_name, middle_name, last_name, email, password_hash, role, office_id FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0];
};

const getUserByOfficeId = async (office_id) => {
  const result = await pool.query(
    "SELECT user_id, first_name, middle_name, last_name, email, role, office_id FROM users WHERE office_id = $1",
    [office_id],
  );

  return result.rows;
};

const createUser = async (
  first_name,
  middle_name,
  last_name,
  email,
  password_hash,
  role,
  office_id,
) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

  const result = await pool.query(
    `INSERT INTO users(first_name, middle_name, last_name, email, password_hash, role, office_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING first_name, middle_name, last_name, email, role, office_id`,
    [
      first_name,
      middle_name,
      last_name,
      email,
      hashedPassword,
      role,
      office_id,
    ],
  );

  return result.rows[0];
};

const updateUser = async (
  user_id,
  first_name,
  middle_name,
  last_name,
  email,
  password_hash,
  role,
  office_id,
) => {
  const fields = [];
  const value = [];
  let index = 1;

  if (first_name !== undefined) {
    fields.push(`first_name = $${index}`);
    value.push(first_name);
    index++;
  }

  if (middle_name !== undefined) {
    fields.push(`middle_name = $${index}`);
    value.push(middle_name);
    index++;
  }

  if (last_name !== undefined) {
    fields.push(`last_name = $${index}`);
    value.push(last_name);
    index++;
  }

  if (email !== undefined) {
    fields.push(`email = $${index}`);
    value.push(email);
    index++;
  }

  if (password_hash !== undefined) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    fields.push(`password_hash = $${index}`);
    value.push(hashedPassword);
    index++;
  }

  if (role !== undefined) {
    fields.push(`role = $${index}`);
    value.push(role);
    index++;
  }
  if (office_id !== undefined) {
    fields.push(`office_id = $${index}`);
    value.push(office_id);
    index++;
  }

  value.push(user_id);

  const query = `UPDATE users SET ${fields.join(", ")} WHERE user_id = $${index} RETURNING user_id, first_name, middle_name, last_name, email, role, office_id, created_at`;

  const result = await pool.query(query, value);
  return result.rows[0];
};

const deleteUser = async (user_id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING user_id, first_name, last_name, email",
    [user_id],
  );

  return result.rows[0];
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByOfficeId,
  createUser,
  updateUser,
  deleteUser,
};
