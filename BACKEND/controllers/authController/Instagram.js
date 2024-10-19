
const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('../../models/User'); // Asegúrate de que la ruta sea correcta

passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_APP_ID, // Asegúrate de que esta variable esté configurada correctamente
    clientSecret: process.env.INSTAGRAM_APP_SECRET,
    callbackURL: process.env.INSTAGRAM_CALLBACK_URL,
    scope: ['user_profile'], 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { instagramId: profile.id } });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          instagramId: profile.id,
        });
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
