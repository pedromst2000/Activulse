require("dotenv").config({ path: __dirname + "/../tests.env" });
const supertest = require("supertest");
const app = require("../app");

// default route
describe("GET /api/v1", () => {
	it("should return 200 OK", async () => {
		const res = await supertest(app).get("/api/v1");
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.message).toBe("Welcome to the Activulse API !");
	});
});

// Invalid routes
describe("GET /api/v1/invalid", () => {
	it("should return 404 Not found", async () => {
		const res = await supertest(app).get("/api/v1/invalid");
		expect(res.status).toBe(404);
		expect(res.body.success).toBe(false);
		expect(res.body.message).toBe("Invalid route");
	});
});
