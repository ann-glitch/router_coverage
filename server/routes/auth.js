const express = require("express");

const { googleLogin, logout, getMe } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/login", googleLogin);
router.get("/logout", logout);
router.get("/profile", protect, getMe);

module.exports = router;
