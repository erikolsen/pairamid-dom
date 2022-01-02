import React from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Header from "./Header";
import TeamToday from "./TeamToday";
import PairFrequency from "./PairFrequency";
import PairHistory from "./PairHistory";
import TeamSettings from "./TeamSettings";
import TeamCalendar from "./TeamCalendar";
import UserProfile from "./UserProfile";
import Terms from "./Terms";
import { TeamContextProvider } from "./TeamContext";

const storeTeam = (teamId) => {
  let teams = localStorage.getItem("pairamid-teams");
  if (!teams) {
    teams = teamId;
    localStorage.setItem("pairamid-teams", teams);
  }

  if (!teams.includes(teamId)) {
    localStorage.setItem("pairamid-teams", teams + "," + teamId);
  }
};

const TeamLayout = ({ match }) => {
  const { teamId } = useParams();
  storeTeam(teamId);

  return (
    <TeamContextProvider>
      <div className="grid grid-cols-1 lg:grid-cols-8">
        <Header />
        <Terms />
        <Switch>
          <Route path={`${match.path}/frequency`} component={PairFrequency} />
          <Route path={`${match.path}/history`} component={PairHistory} />
          <Route path={`${match.path}/settings`} component={TeamSettings} />
          <Route path={`${match.path}/calendar`} component={TeamCalendar} />
          <Route path={`${match.path}/users/:userId`} component={UserProfile} />
          <Route exact path={`${match.path}/`} component={TeamToday} />
        </Switch>
      </div>
    </TeamContextProvider>
  );
};

export default TeamLayout;
