const geoip = require('geoip-lite');

const geoblock = (allowedCountries) => (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  if (!geo || !allowedCountries.includes(geo.country)) {
    return res.status(403).json({ message: 'Acceso denegado desde tu ubicación.' });
  }

  next();
};

module.exports = geoblock;