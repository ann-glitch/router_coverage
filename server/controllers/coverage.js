const asyncHandler = require("express-async-handler");
const Coverage = require("../models/Coverage");

// @description Add router number, geocoordinates and status
// @route POST /api/coverage
// @access public
exports.addRouterData = asyncHandler(async (req, res, next) => {
  const routerData = await Coverage.create(req.body);

  res.status(201).json({
    success: true,
    routerData,
  });
});

// @description Get router number, geocoordinates and status
// @route GET /api/coverage
// @access public
exports.getRouterData = asyncHandler(async (req, res, next) => {
  const routerData = await Coverage.find();

  res.status(200).json({
    success: true,
    routerData,
  });
});
