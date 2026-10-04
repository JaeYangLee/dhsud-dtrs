const OfficesController = require("../controller/OfficesController");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, OfficesController.getAllOffice);
router.get("/:office_id", verifyToken, OfficesController.getOfficeByID);

module.exports = router;
