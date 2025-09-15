import { sum } from "../src/utils/math";

describe("Math utility functions", () => {
  test("sum adds two numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, -1)).toBe(-2);
    expect(sum(0, 0)).toBe(0);
  });
});