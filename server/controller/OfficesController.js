const OfficesModel = require("../model/OfficesModel");

const getAllOffice = async (req, res) => {
  try {
    const AllOffices = await OfficesModel.getAllOffices();

    res.status(200).json({
      message: "[GET /OfficesController.js]: Fetching all offices successful!",
      data: AllOffices,
    });
  } catch (err) {
    console.error(
      "[GET /OfficesController.js]: Error fetching all offices!",
      err.message,
    );
    res
      .status(500)
      .json({ message: "[GET /OfficesController.js]: Server Error!" });
  }
};

const getOfficeByID = async (req, res) => {
  try {
    const { office_id } = req.params;
    const officeID = await OfficesModel.getOfficeById(office_id);

    if (!officeID) {
      return res.status(404).json({
        message: "[GET /OfficesController.js]: Office id not found!",
      });
    }

    res.status(200).json({
      message: "[GET /OfficesController.js]: Office id found!",
      data: officeID,
    });
  } catch (err) {
    console.error(
      "[GET /OfficesController.js]: Error fetching office id!",
      err.message,
    );
    res
      .status(500)
      .json({ message: "[GET /OfficesController.js]: Server Error!" });
  }
};

module.exports = {
  getAllOffice,
  getOfficeByID,
};
