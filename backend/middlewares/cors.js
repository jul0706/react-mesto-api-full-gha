const allowedCorsDomain = process.env.FRONTEND_DOMAIN;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function allowCors(req, res, next) {
  console.log('Hello');
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  if (allowedCorsDomain.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('HI');
  }
  if (method === 'OPTIONS') {
    console.log('BB');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
}

module.exports = allowCors;
