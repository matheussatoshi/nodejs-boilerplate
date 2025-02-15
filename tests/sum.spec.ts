import { sum } from "@/utils/sum";
import { expect, test } from "@jest/globals";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
