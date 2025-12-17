import { greeting } from "../src/ship.js";

test("outputs greeting", () => {
  expect(greeting()).toBe("Hello");
});
