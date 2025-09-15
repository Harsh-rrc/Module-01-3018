import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/health", () => {
  it("should return 200 OK and server status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.statusCode).toBe(200);

    // Basic checks
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("version", "1.0.0");

    // Dynamic values
    expect(typeof response.body.uptime).toBe("number");
    expect(response.body.uptime).toBeGreaterThan(0);

    expect(typeof response.body.timestamp).toBe("number");
    expect(response.body.timestamp).toBeLessThanOrEqual(Date.now());
  });
});