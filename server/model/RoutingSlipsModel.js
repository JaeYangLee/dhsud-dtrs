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

const createRoutingSlip = async (subject, current_office_id, created_by) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const office = await client.query(
      "SELECT office_code FROM offices WHERE office_id = $1",
      [current_office_id],
    );

    const office_code = office.rows[0].office_code;

    const counter = await client.query(
      `INSERT INTO routing_slip_counters (office_id, slip_date, last_number) VALUES ($1, (NOW() AT TIME ZONE 'Asia/Manila')::date, 1) ON CONFLICT (office_id, slip_date) DO UPDATE SET last_number = routing_slip_counters.last_number + 1 RETURNING TO_CHAR(slip_date, 'YYYY-MMDD') AS date_part, last_number`,
      [current_office_id],
    );

    const { date_part, last_number } = counter.rows[0];

    const routing_slip_number = `${office_code}-${date_part}-${String(last_number).padStart(3, "0")}`;

    const result = await client.query(
      "INSERT INTO routing_slips (routing_slip_number, subject, current_office_id, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [routing_slip_number, subject, current_office_id, created_by],
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
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
