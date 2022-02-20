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

const User = ({ teamMember }) => {
  let username = teamMember.username || "";
  let color = teamMember.role.color || "#64dfdfff";
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
  let teamMembers = event.teamMembers || [];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      {teamMembers
        .filter((teamMember) => event.username !== teamMember.username)
        .map((teamMember, i) => (
          <User key={i} teamMember={teamMember} />
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
        startAccessor="createdAt"
        endAccessor="createdAt"
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
