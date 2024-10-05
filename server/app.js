const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserController = require("./controllers/userContoller");
const cors = require("cors");
const KelasController = require("./controllers/kelasController");
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

app.get("/kelas", async (req, res) => {
  KelasController.getAllKelas(req, res);
});

app.get("/kelas/:id", async (req, res) => {
  KelasController.getKelasById(req, res);
});

app.post("/kelas", async (req, res) => {
  KelasController.createKelas(req, res);
});

app.delete("/kelas/:id", async (req, res) => {
  KelasController.deleteKelas(req, res);
});

app.post("/kelas/:id/sarana", async (req, res) => {
  KelasController.addSarana(req, res);
});

app.delete("/kelas/:id/sarana/:saranasId", async (req, res) => {
  KelasController.deleteSarana(req, res);
});

app.post("/kelas/:id/prasarana", async (req, res) => {
  KelasController.addPrasarana(req, res);
});

app.delete("/kelas/:id/prasarana/:prasaranasId", async (req, res) => {
  KelasController.deletePrasarana(req, res);
});

app.post("/kelas/:id/mediabelajar", async (req, res) => {
  KelasController.addMediaBelajar(req, res);
});

app.delete("/kelas/:id/mediabelajar/:mediabelajarsId", async (req, res) => {
  KelasController.deleteMediaBelajar(req, res);
});

app.post("/kelas/:id/sumberbelajar", async (req, res) => {
  KelasController.addSumberBelajar(req, res);
});

app.delete("/kelas/:id/sumberbelajar/:sumberbelajarsId", async (req, res) => {
  KelasController.deleteSumberBelajar(req, res);
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
