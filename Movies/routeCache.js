const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = (duration = 10, mode = "add") => (req, res, next) => {
   
  if(mode == "del"){
      cache.flushAll();
  }

  if (req.method != "GET") {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.send(cachedResponse);
  } else {
      res.originalSend = res.send;
      res.send = body => {
          res.originalSend(body);
          cache.set(key, body, duration);
      };
      next();
  }
};

