const userController = require("../controller/UsersController");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/profile", verifyToken, userController.getUserByID);
router.get("/:office_id", verifyToken, userController.getUsersByOfficeID);
router.post("/register", userController.createUser);
router.post("/login", userController.logInUser);
router.put("/profile/:user_id", verifyToken, userController.updateUser);
router.delete("/profile/:user_id", verifyToken, userController.deleteUser);

module.exports = router;
