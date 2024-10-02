const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserController = require("./controllers/userContoller");
require("dotenv").config();

const uri = process.env.URI;
const app = express();
const port = process.env.PORT;

mongoose
  .connect(uri, {})
  .then((result) => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/api", async (req, res) => {
  res.send("hai ngapain kesini?");
});

app.get("/user", async (req, res) => {
  UserController.getAllUser(req, res);
});

app.post("/user", async (req, res) => {
  UserController.createUser(req, res);
});

app.delete("/user/:id", async (req, res) => {
  UserController.deleteUser(req, res);
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
