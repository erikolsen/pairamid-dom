import { consolidateList, pairStats } from "./statsHelper";

const initialData = [
  ["AA", 1],
  ["AA", 2],
  ["AA", 3],

  ["AA", 1],
  ["AA", 2],

  ["BB", 1],
  ["BB", 2],
  ["BB", 3],
  ["BB", 4],

  ["CC", 1],
  ["CC", 2],

  ["DD", 1],
  ["DD", 2],

  ["EE", 1],

  ["FF", 1],

  ["GG", 1],
];
const foo = {
  "AP,DM": [
    {
      created_at: "2022-01-03T19:42:55.889507",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "DM",
        },
      ],
    },
    {
      created_at: "2021-12-10T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "DM",
        },
      ],
    },
  ],
  "AP,BN": [
    {
      created_at: "2021-12-27T18:15:56.989925",
      streak: 2,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "BN",
        },
      ],
    },
    {
      created_at: "2021-12-25T22:14:30.309211",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "BN",
        },
      ],
    },
  ],
  AP: [
    {
      created_at: "2021-12-23T21:02:55.062368",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
      ],
    },
  ],
  "AP,JC": [
    {
      created_at: "2021-12-11T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "JC",
        },
      ],
    },
    {
      created_at: "2021-12-05T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "JC",
        },
      ],
    },
  ],
  "AP,RS": [
    {
      created_at: "2021-12-09T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "RS",
        },
      ],
    },
  ],
  "AP,SMT": [
    {
      created_at: "2021-12-08T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "SMT",
        },
      ],
    },
  ],
  "AP,CT": [
    {
      created_at: "2021-12-07T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "CT",
        },
      ],
    },
  ],
  "AP,MB": [
    {
      created_at: "2021-12-06T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#63B3ED",
            name: "pawnee",
          },
          username: "MB",
        },
      ],
    },
  ],
  "AP,GG": [
    {
      created_at: "2021-12-04T15:11:45",
      streak: 1,
      users: [
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "AP",
        },
        {
          role: {
            color: "#7f9cf5",
            name: "parks dept",
          },
          username: "GG",
        },
      ],
    },
  ],
};

describe("statsHelper", () => {
  fit("consolidateList", () => {
    const expected = [3, 2];
    const subject = consolidateList([3, 2, 2, 1, 1].reverse());
    expect(subject).toBe(expected);
  });

  it("does the thing", () => {
    const expected = {
      1: 3,
      2: 3,
      3: 1,
      4: 1,
    };
    const subject = pairStats(initialData);
    expect(subject).toBe(expected);
  });
});
