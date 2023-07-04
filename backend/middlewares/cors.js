// const allowedCorsDomain = process.env.FRONTEND_DOMAIN;
const allowedCorsDomain = ['https://jul.iv.mesto.nomoreparties.sbs', 'http://jul.iv.mesto.nomoreparties.sbs', 'localhost:3000'];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function allowCors(req, res, next) {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCorsDomain.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
}

module.exports = allowCors;
