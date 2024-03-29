import { pairStats } from "./statsHelper";

// const initialData = [
//   ["AA", 1],
//   ["AA", 2],
//   ["AA", 3],

//   ["AA", 1],
//   ["AA", 2],

//   ["BB", 1],
//   ["BB", 2],
//   ["BB", 3],
//   ["BB", 4],

//   ["CC", 1],
//   ["CC", 2],

//   ["DD", 1],
//   ["DD", 2],

//   ["EE", 1],

//   ["FF", 1],

//   ["GG", 1],
// ];

const initialData = {
  "AP,DM": [
    {
      createdAt: "2022-01-03T19:42:55.889507",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-10T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-27T18:15:56.989925",
      streak: 2,
      teamMembers: [
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
      createdAt: "2021-12-25T22:14:30.309211",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-23T21:02:55.062368",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-11T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-05T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-09T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-08T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-07T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-06T15:11:45",
      streak: 1,
      teamMembers: [
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
      createdAt: "2021-12-04T15:11:45",
      streak: 1,
      teamMembers: [
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
  xit("pairStats", () => {
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
