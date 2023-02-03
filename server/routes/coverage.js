const express = require("express");

const { getRouterData, addRouterData } = require("../controllers/coverage");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getRouterData).post(protect, addRouterData);

module.exports = router;
