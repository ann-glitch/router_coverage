const express = require("express");

const { getRouterData, addRouterData } = require("../controllers/coverage");

const router = express.Router();

router.route("/").get(getRouterData).post(addRouterData);

module.exports = router;
