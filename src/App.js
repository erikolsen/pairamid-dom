import React from 'react'
import Header from './components/Header';
import PairFrequency from './components/PairFrequency';
import PairHistory from './components/PairHistory';
import Team from './components/Team';
import TeamSettings from './components/TeamSettings';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Router>
                <Header />
                <Switch>
                    <Route path='/frequency' component={PairFrequency} />
                    <Route path='/history' component={PairHistory} />
                    <Route path='/settings' component={TeamSettings} />
                    <Route path='/' component={Team} />
                </Switch>
            </Router>
        </div>
    );
}
export default App;
