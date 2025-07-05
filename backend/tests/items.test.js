const request = require("supertest");
const express = require("express");
const itemsRouter = require("../src/routes/items");
const fs = require("fs");

jest.mock("fs");

const mockData = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: 2499 },
  {
    id: 2,
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 399,
  },
  { id: 3, name: "Ultra‑Wide Monitor", category: "Electronics", price: 999 },
];

function setupApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/items", itemsRouter);
  return app;
}

describe("Items API", () => {
  beforeEach(() => {
    fs.readFile.mockImplementation((file, cb) =>
      cb(null, JSON.stringify(mockData))
    );
    fs.writeFile.mockImplementation((file, data, cb) => cb(null));
  });
  afterEach(() => jest.resetAllMocks());

  it("GET /api/items returns all items", async () => {
    const app = setupApp();
    const res = await request(app).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(3);
    expect(res.body.items[0].name).toBe("Laptop Pro");
  });

  it("GET /api/items supports search", async () => {
    const app = setupApp();
    const res = await request(app).get("/api/items?q=pro");
    expect(res.status).toBe(200);
    expect(res.body.items[0].name).toMatch(/pro/i);
  });

  it("GET /api/items/:id returns item", async () => {
    const app = setupApp();
    const res = await request(app).get("/api/items/2");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Noise Cancelling Headphones");
  });

  it("GET /api/items/:id 404 for missing", async () => {
    const app = setupApp();
    const res = await request(app).get("/api/items/999");
    expect(res.status).toBe(404);
  });

  it("POST /api/items creates item", async () => {
    const app = setupApp();
    const newItem = { name: "Desk Lamp", category: "Furniture", price: 49 };
    const res = await request(app).post("/api/items").send(newItem);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Desk Lamp");
  });

  it("GET /api/items handles fs error", async () => {
    fs.readFile.mockImplementationOnce((file, cb) => cb(new Error("fail")));
    const app = setupApp();
    const res = await request(app).get("/api/items");
    expect(res.status).toBe(500);
  });
});
