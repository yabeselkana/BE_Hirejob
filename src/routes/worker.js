const express = require("express");
const router = express.Router();
const workController = require("../controller/worker");
// const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
// const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");
// const { validate, myCors } = require("../middlewares/common");

router
  .get("/", workController.getAllWork)
  .get("/id_users/", workController.getIdUsers)
  .get("/search/", workController.getSearchWork)
  .get("/:id", workController.getDetailWork)
  .post("/", upload, workController.createWork)
  .put("/:id", upload, workController.updateWork)
  .delete("/:id", workController.deleteWork);

module.exports = router;
