const UsersRoutes = require("./routes/UsersRoutes");
const OfficesRoutes = require("./routes/OfficesRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dhsud-dtrs/users", UsersRoutes);
app.use("/dhsud-dtrs/offices", OfficesRoutes);

module.exports = app;
