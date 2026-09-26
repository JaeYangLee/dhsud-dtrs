const pool = require("../database/database");
const bcrypt = require("bycrypt");

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
) => {};

const updateUser = async (
  first_name,
  middle_name,
  last_name,
  email,
  password_hash,
  role,
  office_id,
) => {};

const deleteUser = async () => {};

module.exports = {
  getUserById,
  getUserByOfficeID,
  createUser,
  updateUser,
  deleteUser,
};
