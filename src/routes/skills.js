const express = require("express");
const router = express.Router();
const skillsController = require("../controller/skills");
// const { protect } = require("../middlewares/auth");

router
  .get("/", skillsController.getAllSkills)
  .get("/id_users/", skillsController.getIdUsersSkills)
  .get("/:id", skillsController.getDetailSkills)
  .post("/", skillsController.createSkills)
  .put("/:id", skillsController.updateSkills)
  .delete("/:id", skillsController.deleteSkills);

module.exports = router;
