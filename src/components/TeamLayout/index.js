import React, { useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Header from "./Header";
import Team from "./Team";
import PairFrequency from "./PairFrequency";
import PairHistory from "./PairHistory";
import TeamSettings from "./TeamSettings";
import TeamCalendar from "./TeamCalendar";
import UserProfile from "./UserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { TeamContextProvider } from "./TeamContext";

const Terms = () => {
  const [showTerms, setShowTerms] = useState(true);
  const acceptTerms = () => {
    setShowTerms(false);
    localStorage.setItem("pairamid-terms", "4/26/2021");
  };
  const termsAccepted = localStorage.getItem("pairamid-terms");
  return (
    showTerms &&
    !termsAccepted && (
      <footer className="z-50 fixed bottom-0 col-span-8 flex justify-between m-2">
        <div className="bg-blue-100 shadow-lg rounded-lg border border-black p-4">
          <div className="flex">
            <p>
              By accessing or using Pairamid, you accept responsibility for any
              content submitted and actions taken while using the product. You
              are advised to not share organizationally identifiable
              information. <i>Effective starting: April 26th, 2021</i>
            </p>
            <div className="cursor-pointer" onClick={() => acceptTerms()}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

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
          <Route exact path={`${match.path}/`} component={Team} />
        </Switch>
      </div>
    </TeamContextProvider>
  );
};

export default TeamLayout;
