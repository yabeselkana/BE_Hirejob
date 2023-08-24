const express = require("express");
const router = express.Router();
const portfolioController = require("../controller/portofolio");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", portfolioController.getAllPortofolio)
  .get("/search/", portfolioController.getSearchPortofolio)
  .get("/id_users/", portfolioController.getIdUsers)
  .get("/:id", portfolioController.getDetailPortofolio)
  .post("/", upload, portfolioController.createPortofolio)
  .put("/:id", upload, portfolioController.updatePortofolio)
  .delete("/:id", portfolioController.deletePortofolio);

module.exports = router;
