import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class CalendarToolbar extends React.Component {
  render() {
    return (
      <div className="flex justify-between m-4">
        <button
          className="p-1 text-xs"
          type="button"
          onClick={() => this.props.onNavigate("PREV")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span className="mx-2">PREV</span>
        </button>
        <span
          className="flex items-center"
          onClick={() => this.props.onNavigate("TODAY")}
        >
          {this.props.label}
        </span>
        <button
          className="p-1 text-xs"
          type="button"
          onClick={() => this.props.onNavigate("NEXT")}
        >
          <span className="mx-2">NEXT</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  }
}

const User = (props) => {
  let username = props.user.username || "";
  let color = props.user.role.color || "#64dfdfff";
  return (
    <div className="mx-px">
      <div
        style={{ backgroundColor: color }}
        className={`bg-gray-med col-span-1 w-6 h-6 md:w-8 md:h-8 border-gray-border rounded-full flex items-center justify-center`}
      >
        <p className="text-white font-bold text-xs">{username}</p>
      </div>
    </div>
  );
};

const EventComponent = ({ event }) => {
  let team_members = event.team_members || [];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      {team_members
        .filter((user) => event.username !== user.username)
        .map((user, i) => (
          <User key={i} user={user} />
        ))}
    </div>
  );
};

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ProfileCalendar = ({ pairingSessions, username }) => {
  let myEventsList = pairingSessions || [];
  return (
    <div className="bg-white">
      <Calendar
        localizer={localizer}
        views={["month"]}
        navigate={["back", "next"]}
        events={myEventsList.map((event) => ({ ...event, username: username }))}
        startAccessor="created_at"
        endAccessor="created_at"
        style={{ height: 600 }}
        components={{
          eventWrapper: EventComponent,
          toolbar: CalendarToolbar,
        }}
      />
    </div>
  );
};

export default ProfileCalendar;
