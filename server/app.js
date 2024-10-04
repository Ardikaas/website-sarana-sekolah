const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserController = require("./controllers/userContoller");
const cors = require("cors");
require("dotenv").config();

const uri = process.env.URI;
const app = express();
const port = process.env.PORT;

mongoose
  .connect(uri, {})
  .then((result) => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/api", async (req, res) => {
  res.send("hai ngapain kesini?");
});

app.get("/user", async (req, res) => {
  UserController.getAllUser(req, res);
});

app.get("/user/:id", async (req, res) => {
  UserController.getUserById(req, res);
});

app.post("/user", async (req, res) => {
  UserController.createUser(req, res);
});

app.put("/user/:id", async (req, res) => {
  UserController.editUser(req, res);
});

app.delete("/user/:id", async (req, res) => {
  UserController.deleteUser(req, res);
});

app.post("/user/login", async (req, res) => {
  UserController.loginUser(req, res);
});

app.get("/user/logout", async (req, res) => {
  UserController.logoutUser(req, res);
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
