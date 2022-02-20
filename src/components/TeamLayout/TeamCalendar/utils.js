import { startOfDay, isSameDay, isWeekend } from "date-fns";

export const businessDays = (start, end) => {
  let count = 0;
  let curDate = startOfDay(new Date(start));
  let endDate = startOfDay(new Date(end));

  while (curDate <= endDate) {
    let dayOfWeek = curDate.getDay();
    if (!(dayOfWeek === 6 || dayOfWeek === 0)) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

export const arrayFrom = (reminder, startDate, endDate) => {
  const fetchDays = overLap(
    startDate,
    endDate,
    new Date(reminder.startDate),
    new Date(reminder.endDate)
  );
  const arrayLength = businessDays(...fetchDays);
  return Array(arrayLength).fill(reminder.teamMember.role.name);
};

export const buildReminders = (reminders, startDate, endDate) => {
  const relevant = reminders
    .filter((r) => !!r.message.match(/Out of Office/))
    .filter((r) => r.teamMember);
  return relevant.flatMap((reminder) =>
    arrayFrom(reminder, startDate, endDate).fill(reminder.teamMember.role.name)
  );
};

export const getPercent = (roleNames, role, startDate, endDate) => {
  if (isWeekend(startDate) && isSameDay(startDate, endDate)) {
    return 0.0;
  }
  const totalDays = businessDays(startDate, endDate);
  const roleCount = roleNames.filter((name) => name === role.name).length;
  return (100 - (roleCount / (role.totalMembers * totalDays)) * 100).toFixed(2);
};

const sortedTotalMembers = (a, b) => {
  if (a.totalMembers > b.totalMembers) {
    return 1;
  }
  if (a.totalMembers < b.totalMembers) {
    return -1;
  }
  return 0;
};

export const formatReminders = (reminders, team, startDate, endDate) => {
  const roleNames = buildReminders(reminders, startDate, endDate);
  return team.roles
    .filter((role) => role.totalMembers > 0)
    .sort(sortedTotalMembers)
    .map((role) => ({
      name: role.name,
      color: role.color,
      memberCount: role.totalMembers,
      percent: getPercent(roleNames, role, startDate, endDate),
    }));
};

export const overLap = (
  selectedStart,
  selectedEnd,
  reminderStart,
  reminderEnd
) => {
  // a = selectedStart
  // b = selectedEnd
  // A = reminderStart
  // B = reminderEnd

  if (reminderStart >= selectedStart && reminderEnd <= selectedEnd) {
    // a--A--B--b // reminder within  reminder start - remeinder end
    return [reminderStart, reminderEnd];
  }

  if (reminderStart >= selectedStart && reminderEnd >= selectedEnd) {
    // a--A--b--B // forward offset   reminder start - selected end
    return [reminderStart, selectedEnd];
  }

  if (reminderStart <= selectedStart && reminderEnd <= selectedEnd) {
    // A--a--B--b // back offset      selected start - reminder end
    return [selectedStart, reminderEnd];
  }

  if (reminderStart <= selectedStart && reminderEnd >= selectedEnd) {
    // A--a--b--B // selected within  selected start - selected end
    return [selectedStart, selectedEnd];
  }

  return [null, null];
};
