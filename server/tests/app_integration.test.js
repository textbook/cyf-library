const request = require("supertest");
const appFactory = require("../app");

describe("routing", () => {
  let app;

  beforeEach(() => {
    app = appFactory(global.__MONGO_DB__);
  });

  it("returns index file for route paths", async () => {
    await request(app)
      .get("/foobar")
      .expect(200);
  });

  it("returns not found file for missing API paths", async () => {
    await request(app)
      .get("/api/foobar")
      .expect(404);
  });
});
