const pool = require("../database/database");
const bcrypt = require("bcrypt");

const getUserById = async (user_id) => {};

const getUserByOfficeID = async (office_id) => {};

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
  let query =
    "UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, role = $5, office_id = $6";

  const values = [first_name, middle_name, last_name, email, role, office_id];

  if (password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    query += ", password = $7 WHERE user_id = $8 RETURNING *";
    values.push(hashedPassword, user_id);
  } else {
    query += "WHERE user_id = $7 RETURNING *";
    values.push(user_id);
  }

  const result = await pool.query(query, value);
  return result.row[0];
};

const deleteUser = async (user_id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [user_id],
  );

  return result.rows[0];
};

module.exports = {
  getUserById,
  getUserByOfficeID,
  createUser,
  updateUser,
  deleteUser,
};
