import NodeCache from "node-cache";

// create cache
export const cache = new NodeCache({
  stdTTL: 600, //10 minutes Standard Time To Leave
  checkperiod: 620, //check for the expired keys every 620 seconds
  useClones: false,
});

export const cacheMiddleware =
  (key, ttl = 600) =>
  async (req, res, next) => {
    //create a unique key based on our API routes and query parameters
    const cacheKey = `${key}_${req.originalUrl}_${JSON.stringify(req.query)}`;
    try {
      const cachedData = cache.get(cacheKey); //retreive our key/saved data
      if (cachedData) {
        console.log(`Cache key for : ${cacheKey}`); //log the cache hit
        return res.json(cachedData); //send the cached data as a response ot the client
      }

      // try to save response
      const originalJSON = res.json; //save the original res.json method
      res.json = function (data) {
        // cache the response data
        cache.set(cacheKey, data, ttl); //save the response data to the cache with a TTL
        console.log(`Cache key for : ${cacheKey}`); //log the cache hit
        return originalJSON.call(this, data); //call the original res.json method with the data
      };
      // call the next middleware in the stack
      next();
    } catch (error) {
      console.error("Cache error", error);
      // if there is an error, call the next middleware in the stack
      // and pass the error to the next middleware
      next();
    }
  };

export const clearCache = (pattern = null, clearAll = false) => {
  const keys = cache.keys(); // get all the keys from the cache
  if (clearAll) {
    keys.forEach((key) => {
      cache.del(key); // delete the key from the cache
      console.log(`Cache key deleted: ${key}`); // log the key being deleted
    });
    return;
  }

  // this will clear cached data based on matched keys
  const matchingKeys = pattern
    ? keys.filter((key) => key.includes(pattern)) // get the keys that match the pattern
    : keys; // get all the keys from the cache

  matchingKeys.forEach((key) => {
    cache.del(key);
    console.log(`Cache key deleted: ${key}`); // log the key being deleted
  });
  console.log(`Cache key deleted: ${matchingKeys.length} cache entries`); // log the number of deleted keys
};