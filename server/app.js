const UsersRoutes = require("../server/routes/UsersRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dhsud-dtrs", UsersRoutes);

module.exports = app;
