const express = require("express");
const router = express.Router();
const rekrutController = require("../controller/rekruter");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", rekrutController.getAllRekrut)
  .get("/id_users/", rekrutController.getIdUsers)
  .get("/search/", rekrutController.getSearchRekrut)
  .get("/:id", rekrutController.getDetailRekrut)
  .put("/photo/:id", upload, rekrutController.updateRekrutPhoto)
  .post("/", upload, rekrutController.createRekrut)
  .put("/:id", upload, rekrutController.updateRekrut)
  .delete("/:id", rekrutController.deleteRekrut);

module.exports = router;
