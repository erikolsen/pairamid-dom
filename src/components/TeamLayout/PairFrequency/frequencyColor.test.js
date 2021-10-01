import { frequencyColor, RED, YELLOW, GREEN, GRAY } from "./frequencyColor";

describe("frequencyColor", () => {
  describe("gray", () => {
    it("Soloing is marked gray", () => {
      const target = {
        username: "AA",
        roleName: "role1",
        frequencies: {
          AA: 0,
          BB: 0,
        },
      };
      const allUsers = ["AA", "BB"];
      const value = target.frequencies["AA"];

      const result = frequencyColor(target, value, allUsers, true);

      expect(result).toBe(GRAY);
    });
  });
  describe("yellow", () => {
    it("Never paired should always be yellow", () => {
      const target = {
        username: "AA",
        roleName: "role1",
        frequencies: {
          AA: 0,
          BB: 0,
        },
      };
      const value = target.frequencies["BB"];
      const allUsers = ["AA", "BB"];

      const result = frequencyColor(target, value, allUsers);
      expect(result).toBe(YELLOW);
    });

    it("pairing half as much as the average should be yellow", () => {
      const target = {
        username: "AA",
        roleName: "role1",
        frequencies: {
          AA: 5,
          BB: 2,
          CC: 5,
          DD: 4,
        },
      };
      const value = target.frequencies["BB"];
      const allUsers = ["AA", "BB", "CC", "DD"];

      const result = frequencyColor(target, value, allUsers);
      expect(result).toBe(YELLOW);
    });
  });

  describe("red", () => {
    it("pairing twice as much as the average should be red", () => {
      const target = {
        username: "AA",
        roleName: "role1",
        frequencies: {
          AA: 2,
          BB: 5,
          CC: 1,
          DD: 1,
        },
      };
      const value = target.frequencies["BB"];
      const allUsers = ["AA", "BB", "CC", "DD"];

      const result = frequencyColor(target, value, allUsers);
      expect(result).toBe(RED);
    });

    it("pairing over twice as much as the average should be red", () => {
      const target = {
        username: "AA",
        roleName: "role1",
        frequencies: {
          AA: 2,
          BB: 4,
          CC: 1,
          DD: 1,
        },
      };
      const value = target.frequencies["BB"];
      const allUsers = ["AA", "BB", "CC", "DD"];

      const result = frequencyColor(target, value, allUsers);
      expect(result).toBe(RED);
    });
  });

  describe("green", () => {
    it("is green when everyone has paired the same amount", () => {
      const target = {
        username: "AA",
        roleName: "role1",
        frequencies: {
          AA: 0,
          BB: 1,
          CC: 1,
          DD: 0,
        },
      };
      const value = target.frequencies["BB"];
      const allUsers = ["AA", "BB", "CC", "DD"];

      const result = frequencyColor(target, value, allUsers);
      expect(result).toBe(GREEN);
    });
  });
});
