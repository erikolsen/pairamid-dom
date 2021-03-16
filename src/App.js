import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Admin from './components/Admin';
import Teams from './components/Teams';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import TeamLayout from './components/TeamLayout';
import User from './components/User';
import FeedbackRequest from './components/User/Feedback/FeedbackRequest';

const App = () => {
    return (
        <div className=''>
            <Router>
                <Switch>
                    <Route path='/teams' component={Teams} />
                    <Route path='/team/:teamId' component={TeamLayout} />
                    <Route path='/users/:userId/feedback/new' component={FeedbackRequest} />
                    <Route path='/users/:userId' component={User} />
                    <Route path='/admin/teams' component={Admin} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/login' component={SignIn} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
