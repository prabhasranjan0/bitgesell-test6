const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../../data/items.json");

// Utility to read data (async, non-blocking)
function readDataAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_PATH, (err, raw) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
  });
}

// GET /api/items
router.get("/", async (req, res, next) => {
  try {
    const data = await readDataAsync();
    let { q, page = 1, pageSize = 20 } = req.query;
    let pageNum = parseInt(page);
    let size = parseInt(pageSize);
    if (!Number.isFinite(pageNum) || pageNum < 1) pageNum = 1;
    if (!Number.isFinite(size) || size < 1) size = 20;
    let results = data;

    if (q) {
      results = results.filter((item) =>
        typeof item.name === "string" &&
        item.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Pagination
    const start = (pageNum - 1) * size;
    const end = start + size;
    const paginated = results.slice(start, end);

    res.json({
      items: Array.isArray(paginated) ? paginated : [],
      total: Number.isFinite(results.length) ? results.length : 0,
      page: pageNum,
      pageSize: size,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const data = await readDataAsync();
    const item = data.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    const item = req.body;
    const data = await readDataAsync();
    item.id = Date.now();
    data.push(item);
    fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), (err) => {
      if (err) return next(err);
      res.status(201).json(item);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
