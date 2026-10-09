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
  } catch (err) {}
};

const createRoutingSlip = async () => {
  try {
  } catch (err) {}
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
