import {
  businessDays,
  overLap,
  formatReminders,
  buildReminders,
  getPercent,
} from "../utils";

describe("utils", () => {
  describe("getPercent", () => {
    it("does the thing", () => {
      const role = {
        name: "DEV",
        total_members: 2,
      };
      const startDate = new Date("1/18/2021");
      const endDate = new Date("1/18/2021");
      const roleNames = ["DEV"];

      const result = getPercent(roleNames, role, startDate, endDate);
      expect(result).toEqual("50.00");
    });

    it("does another thing", () => {
      const role = {
        name: "DEV",
        total_members: 2,
      };
      const startDate = new Date("1/18/2021");
      const endDate = new Date("1/19/2021");
      const roleNames = ["DEV", "DEV"];

      const result = getPercent(roleNames, role, startDate, endDate);
      expect(result).toEqual("50.00");
    });
  });

  describe("buildReminders", () => {
    it("does another thing", () => {
      const reminders = [
        {
          message: "Out of Office",
          team_member: { role: { name: "DEV" } },
          start_date: "1/18/2021",
          end_date: "1/30/2021",
        },
        {
          message: "Out of Office",
          team_member: false,
        },
      ];
      const startDate = new Date("1/18/2021");
      const endDate = new Date("1/22/2021");

      const result = buildReminders(reminders, startDate, endDate);
      expect(result).toEqual(Array(5).fill("DEV"));
    });

    it("does the thing", () => {
      const reminders = [
        {
          message: "Out of Office",
          team_member: { role: { name: "DEV" } },
          start_date: "1/18/2021",
          end_date: "1/20/2021",
        },
        {
          message: "Out of Office",
          team_member: false,
        },
      ];
      const startDate = new Date("1/18/2021");
      const endDate = new Date("1/22/2021");

      const result = buildReminders(reminders, startDate, endDate);
      expect(result).toEqual(Array(3).fill("DEV"));
    });
  });

  describe("formatReminders", () => {
    it("does the thing", () => {
      const reminders = [
        {
          message: "",
        },
      ];
      const team = {
        roles: [
          {
            name: "foo",
            color: "red",
            total_members: 10,
          },
          {
            name: "bar",
            color: "blue",
            total_members: 2,
          },
        ],
      };
      const startDate = new Date("1/18/2021");
      const endDate = new Date("1/18/2021");

      const result = formatReminders(reminders, team, startDate, endDate);
      expect(result).toEqual([
        {
          name: "bar",
          color: "blue",
          memberCount: 2,
          percent: "100.00",
        },
        {
          name: "foo",
          color: "red",
          memberCount: 10,
          percent: "100.00",
        },
      ]);
    });
  });

  describe("businessDays", () => {
    it("Monday - Friday returns 5", () => {
      const start = new Date("1/4/2021");
      const end = new Date("1/8/2021");
      const result = businessDays(start, end);
      expect(result).toBe(5);
    });

    it("Sunday - Saturday returns 5", () => {
      const start = new Date("1/3/2021");
      const end = new Date("1/9/2021");
      const result = businessDays(start, end);
      expect(result).toBe(5);
    });
  });

  describe("overLap", () => {
    it("returns reminder range when reminder within the selected range", () => {
      const selectedStart = new Date("1/1/2021");
      const selectedEnd = new Date("1/10/2021");
      const reminderStart = new Date("1/2/2021");
      const reminderEnd = new Date("1/4/2021");

      const result = overLap(
        selectedStart,
        selectedEnd,
        reminderStart,
        reminderEnd
      );
      expect(result[0]).toBe(reminderStart);
      expect(result[1]).toBe(reminderEnd);
    });

    it("returns selected range when selected within the reminder range", () => {
      const selectedStart = new Date("1/2/2021");
      const selectedEnd = new Date("1/4/2021");
      const reminderStart = new Date("1/1/2021");
      const reminderEnd = new Date("1/10/2021");

      const result = overLap(
        selectedStart,
        selectedEnd,
        reminderStart,
        reminderEnd
      );
      expect(result[0]).toBe(selectedStart);
      expect(result[1]).toBe(selectedEnd);
    });

    it("returns reminderStart and selectedEnd when selected range includes start of reminder", () => {
      const selectedStart = new Date("1/1/2021");
      const selectedEnd = new Date("1/4/2021");
      const reminderStart = new Date("1/2/2021");
      const reminderEnd = new Date("1/10/2021");

      const result = overLap(
        selectedStart,
        selectedEnd,
        reminderStart,
        reminderEnd
      );
      expect(result[0]).toBe(reminderStart);
      expect(result[1]).toBe(selectedEnd);
    });

    it("returns selectedStart and reminderEnd when reminder range includes start of selected", () => {
      const selectedStart = new Date("1/2/2021");
      const selectedEnd = new Date("1/10/2021");
      const reminderStart = new Date("1/1/2021");
      const reminderEnd = new Date("1/4/2021");

      const result = overLap(
        selectedStart,
        selectedEnd,
        reminderStart,
        reminderEnd
      );
      expect(result[0]).toBe(selectedStart);
      expect(result[1]).toBe(reminderEnd);
    });
  });
});
