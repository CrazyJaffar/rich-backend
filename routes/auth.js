const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  googleCreateOrLogin,
  accountActivate,
  accountReverify,
  passwordResetEmail,
  passwordVerify,
  newAccessToken,
  logout,
} = require("../controllers/auth");

// Routes
router.post("/account/activate", accountActivate);
router.post("/account/reverify", accountReverify); // Resend account verification email
router.post("/password/reset", passwordResetEmail);
router.post("/password/reset/verify", passwordVerify);
router.post("/login", login);
router.post("/googleAuth", googleCreateOrLogin);
router.post("/refresh_token", newAccessToken); // Generate new access token for user
router.post("/logout", logout);

module.exports = router;
