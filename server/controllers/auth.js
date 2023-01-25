const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email } = ticket.getPayload();

  const user = await User.create({ name, email });

  res.status(200).json({ user });
});
