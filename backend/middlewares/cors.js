const allowedCors = [
  "http://localhost:3005",
  "http://localhost:3000",
  "https://mesto.n1ght.nomoredomainsmonster.ru",
  "http://mesto.n1ght.nomoredomainsmonster.ru",
  "https://api.mesto.n1ght.nomoredomainsmonster.ru",
  "http://api.mesto.n1ght.nomoredomainsmonster.ru",
];

const cors = function (req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);

    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
