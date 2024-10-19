// controllers/authController/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User'); // Ajusta la ruta según tu estructura

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL // Asegúrate de que esta variable esté configurada correctamente
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Aquí intentamos encontrar el usuario en la base de datos
      let user = await User.findOne({ where: { email: profile.emails[0].value } });
      if (!user) {
        // Si no existe, creamos uno nuevo
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          // password se deja como null ya que es un registro a través de Google
        });
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// Serializar usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

module.exports = passport;
