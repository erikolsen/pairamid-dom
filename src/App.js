import React from 'react'
import Header from './components/Header';
import Team from './components/Team';
import PairFrequency from './components/PairFrequency';
import PairHistory from './components/PairHistory';
import TeamSettings from './components/TeamSettings';
import Home from './components/Home';
import Admin from './components/Admin';
import Teams from './components/Teams';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useParams } from 'react-router-dom'

const TeamLayout = ({match}) => {
    const { teamId } = useParams()
    let teams = localStorage.getItem('pairamid-teams') || ''
    if(!teams || !teams.includes(teamId)){
        localStorage.setItem('pairamid-teams', teams + ',' + teamId);
    }


    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <Switch>
                <Route path={`${match.path}/frequency`} component={PairFrequency} />
                <Route path={`${match.path}/history`} component={PairHistory} />
                <Route path={`${match.path}/settings`} component={TeamSettings} />
                <Route exact path={`${match.path}/`} component={Team} />
            </Switch>
        </div>
    )
}

const App = () => {
    return (
        <div className=''>
            <Router>
                <Switch>
                    <Route path='/teams' component={Teams} />
                    <Route path='/team/:teamId' component={TeamLayout} />
                    <Route path='/admin/teams' component={Admin} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
