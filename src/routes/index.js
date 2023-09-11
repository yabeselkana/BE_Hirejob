const express = require("express");
const router = express.Router();
const WorkRouter = require("../routes/worker");
const RekrutRouter = require("./rekruter");
const HiringRouter = require("./hiring");
const SkillsRouter = require("./skills");
const UsersRouter = require("./users");
const UsersPortofolio = require("./portofolio");
const ExperiencePortofolio = require("./experience");

router.use("/work", WorkRouter);
router.use("/rekruter", RekrutRouter);
router.use("/hiring", HiringRouter);
router.use("/skills", SkillsRouter);
router.use("/users", UsersRouter);
router.use("/portofolio", UsersPortofolio);
router.use("/experience", ExperiencePortofolio);

module.exports = router;
