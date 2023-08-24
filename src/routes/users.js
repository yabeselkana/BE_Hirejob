const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");
const { protect } = require("../middlewares/auth");
router
  .post("/registerWork", usersController.registerWork)
  .post("/registerRekrut", usersController.registerRekrut)
  .post("/login", usersController.login)
  .get("/profile", protect, usersController.profile)
  .post("/refersh-token", usersController.refreshToken);

module.exports = router;
