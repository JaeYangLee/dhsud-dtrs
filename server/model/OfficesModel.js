const pool = require("../database/database");

const getAllOffices = async () => {
  const result = await pool.query("SELECT * FROM offices");
  return result.rows;
};

const getOfficeById = async (office_id) => {
  const result = await pool.query(
    "SELECT office_id, office_name, office_type FROM offices WHERE office_id = $1",
    [office_id],
  );

  return result.rows[0];
};

module.exports = {
  getAllOffices,
  getOfficeById,
};
