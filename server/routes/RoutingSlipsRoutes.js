const RoutingSlipsController = require("../controller/RoutingSlipsController");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, RoutingSlipsController.getAllRoutingSlips);
router.get(
  "/:routing_slip_id",
  verifyToken,
  RoutingSlipsController.getRoutingSlipById,
);
router.get(
  "/office/:current_office_id",
  verifyToken,
  RoutingSlipsController.getRoutingSlipsByOffice,
);
router.post("/", verifyToken, RoutingSlipsController.createRoutingSlip);
router.put(
  "/:routing_slip_id/status",
  verifyToken,
  RoutingSlipsController.updateRoutingSlipStatus,
);
router.delete(
  "/:routing_slip_id",
  verifyToken,
  RoutingSlipsController.deleteRoutingSlip,
);

module.exports = router;
