const asyncHandler = require("express-async-handler");
const Coverage = require("../models/Coverage");

// Add router number, geocoordinates and status
exports.addRouterData = asyncHandler(async (req, res, next) => {
  //add user to req.body
  req.body.user = req.user.id;

  const routerData = await Coverage.create(req.body);

  res.status(201).json({
    success: true,
    routerData,
  });
});

//  Get router number, geocoordinates and status
exports.getRouterData = asyncHandler(async (req, res, next) => {
  const routerData = await Coverage.find();

  res.status(200).json({
    success: true,
    routerData,
  });
});
