const allowedCorsDomain = process.env.FRONTEND_DOMAIN;

const allowCors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCorsDomain.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};

module.exports = allowCors;
