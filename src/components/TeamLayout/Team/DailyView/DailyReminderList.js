import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../constants";

const Reminder = ({ reminder }) => {
  const user = reminder.user ? reminder.user.username : "Team";
  return (
    <div>
      <p>
        {user} {reminder.message}
      </p>
    </div>
  );
};

const DailyReminderList = () => {
  const { teamId } = useParams();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString();
    axios
      .get(
        `${API_URL}/team/${teamId}/reminders?startDate=${today}&endDate=${today}`
      )
      .then((response) => {
        setReminders(response.data);
      });
  }, [setReminders, teamId]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 col-span-1 my-4">
      <h2 className="my-2 border-b border-gray-border">Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <Reminder reminder={reminder} key={reminder.id} />
        ))}
      </ul>
    </div>
  );
};

export default DailyReminderList;
