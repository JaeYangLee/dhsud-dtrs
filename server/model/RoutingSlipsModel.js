const pool = require("../database/database");

const getAllRoutingSlips = async () => {
  const result = await pool.query("SELECT * FROM routing_slips");

  return result.rows;
};

const getRoutingSlipById = async (routing_slip_id) => {
  const result = await pool.query(
    "SELECT routing_slip_id, routing_slip_number, subject, current_status, current_office_id, created_by, created_at FROM routing_slips WHERE routing_slip_id = $1",
    [routing_slip_id],
  );

  return result.rows[0];
};

const getRoutingSlipsByOffice = async (current_office_id) => {
  const result = await pool.query(
    "SELECT routing_slip_id, routing_slip_number, subject, current_status, current_office_id, created_by, created_at FROM routing_slips WHERE current_office_id = $1",
    [current_office_id],
  );

  return result.rows;
};

const createRoutingSlip = async (
  routing_slip_number,
  subject,
  current_office_id,
  created_by,
) => {
  const result = await pool.query(
    "INSERT INTO routing_slips(routing_slip_number, subject, current_office_id, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
    [routing_slip_number, subject, current_office_id, created_by],
  );

  return result.rows[0];
};

const updateRoutingSlipStatus = async (routing_slip_id, current_status) => {
  const result = await pool.query(
    "UPDATE routing_slips SET current_status = $1 WHERE routing_slip_id = $2 RETURNING *",
    [current_status, routing_slip_id],
  );

  return result.rows[0];
};

const deleteRoutingSlip = async (routing_slip_id) => {
  const result = await pool.query(
    "DELETE FROM routing_slips WHERE routing_slip_id = $1 RETURNING routing_slip_id, routing_slip_number, subject",
    [routing_slip_id],
  );

  return result.rows[0];
};

module.exports = {
  getAllRoutingSlips,
  getRoutingSlipById,
  getRoutingSlipsByOffice,
  createRoutingSlip,
  updateRoutingSlipStatus,
  deleteRoutingSlip,
};
