const express = require("express");
const router = express.Router();
const experienceController = require("../controller/experience");
// const { protect } = require("../middlewares/auth");

router
  .get("/", experienceController.getAllExperience)
  .get("/id_users/", experienceController.getIdUsers)
  .get("/:id", experienceController.getDetailExperience)
  .post("/", experienceController.createExperience)
  .put("/:id", experienceController.updateExperience)
  .delete("/:id", experienceController.deleteExperience);

module.exports = router;
