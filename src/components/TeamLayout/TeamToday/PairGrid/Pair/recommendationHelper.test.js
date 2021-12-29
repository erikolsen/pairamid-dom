import {
  leastPairedWith,
  roleMapping,
  mostPairedWithRole,
} from "./recommendationHelper";
const baseFrequency = [
  {
    username: "AA",
    roleName: "role3",
    frequencies: { AA: 1, BB: 2, CC: 3, DD: 4, EE: 1 },
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
  {
    username: "EE",
    roleName: "role2",
    frequencies: { AA: 1, BB: 2, CC: 3 },
  },
];

describe("pair helpers", () => {
  describe("leastPairedWith", () => {
    it("can return multiple names", () => {
      const user = { username: "AA" };
      const exclusions = [];
      const returnCount = 3;
      const subject = leastPairedWith(
        user,
        baseFrequency,
        exclusions,
        returnCount
      );
      expect(subject).toEqual(["EE", "BB", "CC"]);
    });

    it("excludes active and out of office users", () => {
      const user = { username: "AA" };
      const subject = leastPairedWith(user, baseFrequency, ["BB", "CC"]);
      expect(subject).toEqual(["EE"]);
    });

    it("returns two people the given user has paired with the least", () => {
      const user = { username: "AA" };
      const subject = leastPairedWith(user, baseFrequency, []);
      expect(subject).toEqual(["EE", "BB"]);
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
        EE: "role2",
      });
    });
  });
});
