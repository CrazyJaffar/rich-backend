const express = require("express");
const router = express.Router();

// Middlewares
const {
  authCheck,
  adminCheck,
  superAdminCheck,
} = require("../middlewares/auth");

// Controllers
const { currentAdmin } = require("../controllers/admin");

// Routes
router.post("/currentAdmin", authCheck, adminCheck, currentAdmin);

module.exports = router;
