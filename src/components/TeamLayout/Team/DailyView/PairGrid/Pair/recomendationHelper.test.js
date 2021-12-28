import {
  leastPairedWith,
  roleMapping,
  mostPairedWithRole,
} from "./recomendationHelper";
const baseFrequency = [
  {
    username: "AA",
    roleName: "role3",
    frequencies: { AA: 1, BB: 2, CC: 3, DD: 4 },
  },
  {
    username: "BB",
    roleName: "role2",
    frequencies: { AA: 1, BB: 2, CC: 3 },
  },
  {
    username: "CC",
    roleName: "role2",
    frequencies: { AA: 1, BB: 2, CC: 3 },
  },
  {
    username: "DD",
    roleName: "role1",
    frequencies: { AA: 1, BB: 2, CC: 3 },
  },
];

describe("pair helpers", () => {
  describe("leastPairedWith", () => {
    it("returns two people the given user has paired with the least", () => {
      const user = { username: "AA" };
      const subject = leastPairedWith(user, baseFrequency);
      expect(subject).toEqual(["BB", "CC"]);
    });
  });

  describe("mostPairedWithRole", () => {
    it("returns a user to role mapping", () => {
      const roles = roleMapping(baseFrequency);
      const subject = mostPairedWithRole(baseFrequency[0], roles);
      expect(subject).toEqual("role2");
    });
  });

  describe("roleMapping", () => {
    it("returns a user to role mapping", () => {
      const subject = roleMapping(baseFrequency);
      expect(subject).toEqual({
        AA: "role3",
        BB: "role2",
        CC: "role2",
        DD: "role1",
      });
    });
  });
});
