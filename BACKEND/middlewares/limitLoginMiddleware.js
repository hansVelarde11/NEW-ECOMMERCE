const { RateLimiterMemory } = require('rate-limiter-flexible');

//intentos maximos
const maxLogin =5;
//duarcion del bloqueo
const blockDuration = 15*60

//congi del rate limiter
const rateLimiter = new RateLimiterMemory({
    keyPrefix: 'login_fail',  // Prefijo clave para los intentos fallidos
    points: maxLogin,  
    duration: blockDuration,  
  });

const limitLoginMiddleware = (req, res, next) => {
    const userIp = req.ip;  // Usar la IP del usuario como clave
    
/*const userEmail = req.body.email || '';  // Usar el email del usuario como clave
  
  if (!userEmail) {
    return res.status(400).json({ message: 'El email es obligatorio.' });
  } */




    // Intentar consumir puntos (un intento fallido)
    rateLimiter.consume(userIp)
      .then(() => {
        // Continuar al siguiente middleware o controlador
        next();
      })
      .catch(() => {
        // Si se exceden los intentos, devolver error 429
        return res.status(429).json({
          message: `Demasiados intentos fallidos. Inténtalo de nuevo en ${blockDuration / 60} minutos.`,
        });
      });
  };
  module.exports =limitLoginMiddleware;
  
