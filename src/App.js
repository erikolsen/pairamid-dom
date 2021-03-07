import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Admin from './components/Admin';
import Teams from './components/Teams';
import SignUp from './components/SignUp';
import Login from './components/Login'
import TeamLayout from './components/TeamLayout';
import User from './components/User';
import FeedbackGiven from './components/User/Feedback/FeedbackGiven';
import FeedbackReceived from './components/User/Feedback/FeedbackReceived';

const App = () => {
    return (
        <div className=''>
            <Router>
                <Switch>
                    <Route path='/teams' component={Teams} />
                    <Route path='/team/:teamId' component={TeamLayout} />
                    <Route path='/users/:userId/feedback-given' component={FeedbackGiven} />
                    <Route path='/users/:userId/feedback-received' component={FeedbackReceived} />
                    <Route path='/users/:userId' component={User} />
                    <Route path='/admin/teams' component={Admin} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
