const express = require("express");

const { googleLogin, logout, getMe } = require("../controllers/auth");

const router = express.Router();

router.post("/login", googleLogin);
router.post("/logout", logout);
router.post("/profile", getMe);

module.exports = router;
