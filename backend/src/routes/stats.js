const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../data/items.json");

// In-memory cache for stats
let cachedStats = null;
let lastMtime = 0;

function computeStats(items) {
  return {
    total: items.length,
    averagePrice: items.length
      ? items.reduce((acc, cur) => acc + cur.price, 0) / items.length
      : 0,
  };
}

// Watch for file changes to invalidate cache
try {
  fs.watch(DATA_PATH, () => {
    cachedStats = null;
  });
} catch (err) {
  if (err.code !== "ENOENT") throw err;
  // If file does not exist, watcher will not be set. It will be set on next request if needed.
}

// GET /api/stats
router.get("/", (req, res, next) => {
  fs.stat(DATA_PATH, (err, stats) => {
    if (err) return next(err);
    if (cachedStats && stats.mtimeMs === lastMtime) {
      return res.json(cachedStats);
    }
    fs.readFile(DATA_PATH, (err, raw) => {
      if (err) return next(err);
      const items = JSON.parse(raw);
      cachedStats = computeStats(items);
      lastMtime = stats.mtimeMs;
      res.json(cachedStats);
    });
  });
});

module.exports = router;
