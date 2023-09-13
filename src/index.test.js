import { checkout } from "./index.js";

it("Should get 0 if nothing is purchased", () => {
  expect(checkout([])).toBe(0);
});
