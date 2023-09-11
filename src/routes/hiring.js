const express = require("express");
const router = express.Router();
const hiringController = require("../controller/hiring");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", hiringController.getAllHiring)
  .get("/id_users/", hiringController.getIdUsers)
  .get("/search/", hiringController.getSearchHiring)
  .get("/:id", hiringController.getDetailHiring)

  .post("/", hiringController.createHiring)

  .delete("/:id", hiringController.deleteHiring);

module.exports = router;
