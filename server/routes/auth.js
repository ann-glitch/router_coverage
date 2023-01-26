const express = require("express");

const { googleLogin, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/login", googleLogin);
router.post("/logout", logout);

module.exports = router;
