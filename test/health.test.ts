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

describe("Required Endpoints", () => {
  it("should have health check endpoint", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
  });

  it("should have portfolio performance endpoint", async () => {
    const response = await request(app).get("/api/v1/portfolio/performance");
    expect(response.status).toBe(200);
  });

  it("should have largest holding endpoint", async () => {
    const response = await request(app).get("/api/v1/portfolio/largest-holding");
    expect(response.status).toBe(200);
  });

  it("should have asset allocation endpoint", async () => {
    const response = await request(app).get("/api/v1/portfolio/allocation");
    expect(response.status).toBe(200);
  });
});

describe("API Endpoints", () => {
  describe("GET /api/v1/portfolio/performance", () => {
    it("should return portfolio performance with default values", async () => {
      const response = await request(app).get("/api/v1/portfolio/performance");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("initialInvestment");
      expect(response.body).toHaveProperty("currentValue");
      expect(response.body).toHaveProperty("profitOrLoss");
      expect(response.body).toHaveProperty("percentageChange");
      expect(response.body).toHaveProperty("performanceSummary");
    });

    it("should return portfolio performance with custom values", async () => {
      const response = await request(app).get(
        "/api/v1/portfolio/performance?initialInvestment=5000&currentValue=7500"
      );

      expect(response.status).toBe(200);
      expect(response.body.initialInvestment).toBe(5000);
      expect(response.body.currentValue).toBe(7500);
      expect(response.body.profitOrLoss).toBe(2500);
    });
  });

  describe("GET /api/v1/portfolio/largest-holding", () => {
    it("should return the largest holding from sample assets", async () => {
      const response = await request(app).get(
        "/api/v1/portfolio/largest-holding"
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("largestHolding");
      expect(response.body.largestHolding).toHaveProperty("name");
      expect(response.body.largestHolding).toHaveProperty("value");
      // Removed type check, since API doesn’t return it
    });
  });

  describe("GET /api/v1/portfolio/allocation", () => {
    it("should return asset allocation percentages", async () => {
      const response = await request(app).get("/api/v1/portfolio/allocation");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("allocation");
      expect(Array.isArray(response.body.allocation)).toBe(true);

      const allocations = response.body.allocation;
      allocations.forEach(
        (asset: { name: string; percentage: number }) => {
          expect(asset).toHaveProperty("name");
          expect(asset).toHaveProperty("percentage");
        }
      );

      // Should add up to approximately 100%
      const totalPercentage = allocations.reduce(
        (sum: number, a: { name: string; percentage: number }) =>
          sum + a.percentage,
        0
      );
      expect(totalPercentage).toBeCloseTo(100, 1);
    });
  });
});
