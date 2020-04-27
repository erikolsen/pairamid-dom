import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import DailyView from './components/DailyView';
import SocketHandler from './components/SocketHandler';
import axios from 'axios'
import { API_URL } from './constants'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const getTodaysDate = () => {
    const today = new Date();
    const dateFormatOptions = {
        month: 'long',
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', dateFormatOptions).format(today);
}

const PairHistory = () => {
    const [history, setHistory] = useState({'visitor': [], 'home': []})
    useEffect(()=> {
        axios.get(`${API_URL}/history`)
            .then((response)=> {
                setHistory(response.data)
            })
    }, [setHistory])
    const visitor = history['visitor'].map((name) => { return <th className='border border-black p-2'>{name}</th>})
    const home = history['home']
    

    return (
        <main className="bg-gray-light col-span-7 p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='flex items-center'>
                        <h1>Pair History</h1>
                    </div>
                    <p className="font-normal text-teal-dark text-xl">{getTodaysDate()}</p>
                </header>
                <table>
                    <th className='border border-black p-2'></th>
                    {visitor}

                </table>
            </section>
        </main>

    )
}

const App = () => {
    const [pairs, setPairs] = useState([])
    const [reset, setReset] = useState([])
    useEffect(()=> {
        axios.get(`${API_URL}/pairing_sessions`)
            .then((response)=> {
                setPairs(response.data)
            })
    }, [setPairs, reset])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Router>
                <Header />
                <Switch>
                    <Route path='/history'>
                        <PairHistory />
                    </Route>
                    <Route path='/'>
                        <SocketHandler requestedData={pairs.length} reset={setReset} >
                            <DailyView setPairs={setPairs} pairs={pairs} />
                        </SocketHandler>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
export default App;
