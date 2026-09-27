const UsersModel = require("../model/UsersModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUserByID = async (req, res) => {
  try {
    const { user_id } = req.user;

    const userId = await UsersModel.getUserById(user_id);

    if (!userId) {
      return res.status(404).json({
        message: "[GET /Controller]: User not found!",
      });
    }

    res.status(200).json({
      message: "[GET /UserController.js]: User ID Found!",
      data: userId,
    });
  } catch (err) {
    console.error(
      "[GET /UserController.js]: Error fetching user by id!",
      err.message,
    );
    return res
      .status(500)
      .json({ message: "[GET /UserController.js]: Server Error" });
  }
};

const logInUser = async (req, res) => {
  try {
  } catch (err) {}
};

const getUserByOfficeID = async (req, res) => {
  try {
  } catch (err) {}
};

const createUser = async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password_hash,
      role,
      office_id,
    } = req.body;

    const newUser = await UsersModel.createUser(
      first_name,
      middle_name,
      last_name,
      email,
      password_hash,
      role,
      office_id,
    );

    if (newUser.password_hash) delete newUser.password_hash;

    const SECRET_KEY = process.env.JWT_SECRET || "superSecret123";
    const token = jwt.sign({ user_id: newUser.user_id }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "[POST /UserController.js]: New user created!",
      token,
      user: newUser,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "[PUT /UserController.js]: email already in use!" });
    }

    console.error(
      "[POST /UserController.js]: Error creating user!",
      err.message,
    );
    res
      .status(500)
      .json({ message: "[POST /UserController.js]: Server error!" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password_hash,
      role,
      office_id,
    } = req.body;

    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "[PUT /UserController.js]: Missing auth user!" });
    }

    if (req.user.user_id !== parseInt(user_id)) {
      return res
        .status(403)
        .json({ error: "[PUT /UserController.js]: Unauthorized!" });
    }

    const isAdmin = req.user.role === "admin";
    const updatedUser = await UsersModel.updateUser(
      user_id,
      first_name,
      middle_name,
      last_name,
      email,
      password_hash,
      isAdmin ? role : undefined,
      isAdmin ? office_id : undefined,
    );

    res.status(200).json({
      message: "[PUT /UserController.js]: User updated successfully!",
      data: updatedUser,
    });
  } catch (err) {
    console.error(
      "[PUT /UserController.js]: Error updating user!",
      err.message,
    );
    res
      .status(500)
      .json({ message: "[PUT /UserController.js]: Server Error!" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (req.user.user_id !== parseInt(user_id)) {
      return res
        .status(403)
        .json({ error: "[DELETE /UserController.js]: Unauthorized!" });
    }

    const deletedUser = await UsersModel.deleteUser(user_id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ error: "[DELETE /UserController.js]: User not found!" });
    }

    res.status(200).json({
      message: "[DELETE /UserController.js]: User deleted!",
      data: deletedUser,
    });
  } catch (err) {
    console.error(
      "[DELETE /UserController.js]: Error deleting user!",
      err.message,
    );
    res.status(500).json("[DELETE /UserController.js]: Server error!!");
  }
};

module.exports = {
  getUserByID,
  logInUser,
  getUserByOfficeID,
  createUser,
  updateUser,
  deleteUser,
};
