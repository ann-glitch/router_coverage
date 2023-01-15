const express = require("express");
const router = express.Router();
const passport = require("passport");

//google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/http://localhost:3000");
  }
);

module.exports = router;
