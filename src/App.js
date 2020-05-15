import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import DailyView from './components/DailyView';
import PairFrequency from './components/PairFrequency';
import PairHistory from './components/PairHistory';
import SocketHandler from './components/SocketHandler';
import TeamSettings from './components/TeamSettings';
import axios from 'axios'
import { API_URL } from './constants'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    const [pairs, setPairs] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/pairing_sessions/daily`)
            .then((response)=> {
                setPairs(response.data)
            })
    }, [setPairs])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Router>
                <Header />
                <Switch>
                    <Route path='/frequency' component={PairFrequency} />
                    <Route path='/history' component={PairHistory} />
                    <Route path='/settings' component={TeamSettings} />
                    <Route path='/'>
                        <SocketHandler requestedData={pairs.length}>
                            <DailyView setPairs={setPairs} pairs={pairs} />
                        </SocketHandler>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
export default App;
