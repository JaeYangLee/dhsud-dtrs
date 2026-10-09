const RoutingSlipsModel = require("../model/RoutingSlipsModel");

const getAllRoutingSlips = async (req, res) => {
  try {
    const allRoutingSlips = await RoutingSlipsModel.getAllRoutingSlips();

    if (req.user.role !== "admin") {
      return res.status(403).json({
        error: "[GET /RoutingSlipsController.js]: Unauthorized!",
      });
    }

    if (!allRoutingSlips || allRoutingSlips.length === 0) {
      return res.status(404).json({
        error: "[GET /RoutingSlipsController.js]: No routing slips found!",
      });
    }

    res.status(200).json({
      message:
        "[GET /RoutingSlipsController.js]: All routing slips fetched successfully!",
      data: allRoutingSlips,
    });
  } catch (err) {
    console.error(
      "[GET /RoutingSlipsController.js]: Error fetching all routing slips!",
      err.message,
    );
    res.status(500).json({
      message: "[GET /RoutingSlipsController.js]: Server error!",
    });
  }
};

const getRoutingSlipById = async (req, res) => {
  try {
    const { routing_slip_id } = req.params;

    const routingSlipsById =
      await RoutingSlipsModel.getRoutingSlipById(routing_slip_id);

    if (!routingSlipsById || routingSlipsById.length === 0) {
      return res.status(404).json({
        error: "[GET /RoutingSlipsController.js]: No routing slips found!",
      });
    }

    res.status(200).json({
      message:
        "[GET /RoutingSlipsController.js]: All routing slips fetched by id!",
      data: routingSlipsById,
    });
  } catch (err) {
    console.error("[GET /RoutingSlipsController.js]:", err.message);
    res
      .status(500)
      .json({ message: "[GET /RoutingSlipsController.js]: Server error!" });
  }
};

const getRoutingSlipsByOffice = async (req, res) => {
  try {
    const { current_office_id } = req.params;

    const routingSlipsByOffice =
      await RoutingSlipsModel.getRoutingSlipsByOffice(current_office_id);

    if (!routingSlipsByOffice || routingSlipsByOffice.length === 0) {
      return res.status(400).json({
        error:
          "[GET /RoutingSlipsController.js]: No routing slips found by office!",
      });
    }

    res.status(200).json({
      message:
        "[GET /RoutingSlipsController.js]: All routing slips fetched by office!",
      data: routingSlipsByOffice,
    });
  } catch (err) {
    console.error(
      "[GET /RoutingSlipsController.js]: Error fetching routing slip by office!",
      err.message,
    );
    res
      .status(500)
      .json({ message: "[POST /RoutingSlipsController.js]: Server error!" });
  }
};

const createRoutingSlip = async () => {
  try {
    const { routing_slip_number, subject, current_office_id, created_by } =
      req.body;

    const newRoutingSlip = await RoutingSlipsModel.createRoutingSlip(
      routing_slip_number,
      subject,
      current_office_id,
      created_by,
    );

    if (
      !routing_slip_number.trim() ||
      !subject.trim() ||
      !current_office_id.trim() ||
      created_by.trim()
    ) {
      return res.status(400).json({
        error: "[POST /RoutingSlipsController.js]: Missing fields required!",
      });
    }

    res.status(200).json({
      message:
        "[POST /RoutingSlipsController.js]: Creating new routing slip successful!",
      data: newRoutingSlip,
    });
  } catch (err) {
    console.error(
      "[POST /RoutingSlipsController.js]: Error creating new routing slip!",
      err.message,
    );
    res
      .status(500)
      .json({ message: "[POST /RoutingSlipsController.js]: Server error!" });
  }
};

const updateRoutingSlipStatus = async (req, res) => {
  try {
  } catch (err) {}
};

const deleteRoutingSlip = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  getAllRoutingSlips,
  getRoutingSlipById,
  getRoutingSlipsByOffice,
  createRoutingSlip,
  updateRoutingSlipStatus,
  deleteRoutingSlip,
};
