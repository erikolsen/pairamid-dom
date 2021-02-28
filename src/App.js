import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Admin from './components/Admin';
import Teams from './components/Teams';
import SignUp from './components/SignUp';
import TeamLayout from './components/TeamLayout';

const App = () => {
    return (
        <div className=''>
            <Router>
                <Switch>
                    <Route path='/teams' component={Teams} />
                    <Route path='/team/:teamId' component={TeamLayout} />
                    <Route path='/admin/teams' component={Admin} />
                    <Route path='/signup' component={SignUp} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
