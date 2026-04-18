const express = require("express");
const { testAuthRoute } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/test", testAuthRoute);

module.exports = router;
