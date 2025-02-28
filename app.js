const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts-routers");
const authRouter = require("./routes/api/auth-routers");

const handleNotFoundPath = require("./middlewares/handleNotFoundPath");
const handleError = require("./middlewares/handleError");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(handleNotFoundPath);

app.use(handleError);

module.exports = app;
