const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = (duration = 10, mode = "add") => (req, res, next) => {
  //clear the cache if movies have changed
  if(mode == "del"){
      cache.flushAll();
  }
  //only cache results for get requests
  if (req.method != "GET") {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  //cache results if they dont exist before sending them back to the user otherwise send the cached results to the user
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

