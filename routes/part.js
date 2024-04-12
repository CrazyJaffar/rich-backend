const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const {
  createModel,
  createYear,
  createPart,
  deleteModel,
  deleteYear,
  deletePart,
  loadYearsModelsParts,
  sendMail,
} = require("../controllers/part");

// Routes

router.post("/model/create", authCheck, createModel);
router.post("/year/create", authCheck, createYear);
router.post("/part/create", authCheck, createPart);
router.get("/load/models-years-parts", loadYearsModelsParts);
router.delete("/model/:mid", authCheck, deleteModel);
router.delete("/year/:yid", authCheck, deleteYear);
router.delete("/part/:pid", authCheck, deletePart);
router.post("/nodemailer/send", sendMail);

module.exports = router;
