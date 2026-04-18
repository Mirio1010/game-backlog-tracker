const express = require("express");
const {
  testAuthRoute,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/auth.controller");
const router = express.Router();

router.get("/test", testAuthRoute);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getCurrentUser);

module.exports = router;
