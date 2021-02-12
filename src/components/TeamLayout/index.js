import React from 'react'
import { Switch, Route, useParams } from "react-router-dom";
import Header from './Header';
import Team from './Team';
import PairFrequency from './PairFrequency';
import PairHistory from './PairHistory';
import TeamSettings from './TeamSettings';
import TeamCalendar from './TeamCalendar';
import UserProfile from './UserProfile'
import FeedbackGiven from './UserProfile/Feedback/FeedbackGiven'
import FeedbackReceived from './UserProfile/Feedback/FeedbackReceived'

const TeamLayout = ({match}) => {
    const { teamId } = useParams()
    let teams = localStorage.getItem('pairamid-teams')
    if(!teams){
        teams = teamId
        localStorage.setItem('pairamid-teams', teams);
    }

    if(!teams.includes(teamId)){
        localStorage.setItem('pairamid-teams', teams + ',' + teamId);
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <Switch>
                <Route path={`${match.path}/frequency`} component={PairFrequency} />
                <Route path={`${match.path}/history`} component={PairHistory} />
                <Route path={`${match.path}/settings`} component={TeamSettings} />
                <Route path={`${match.path}/calendar`} component={TeamCalendar} />
                <Route path={`${match.path}/users/:userId/feedback-given`} component={FeedbackGiven} />
                <Route path={`${match.path}/users/:userId/feedback-received`} component={FeedbackReceived} />
                <Route path={`${match.path}/users/:userId`} component={UserProfile} />
                <Route exact path={`${match.path}/`} component={Team} />
            </Switch>
        </div>
    )
}

export default TeamLayout
