const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          process.env.GOOGLE_CLIENT_ID ||
          "729482189127-amop7djvdboo41vufrv6s8jdkfn1eot1.apps.googleusercontent.com",
        clientSecret:
          process.env.GOOGLE_CLIENT_SECRET ||
          "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",
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);

        //create user
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
        };

        //check for existing user
        const user = await User.findOne({
          googleID: profile.id,
        });

        if (user) {
          return done(null, user);
        } else {
          const user = await User.create(newUser);
          return done(null, user);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});
