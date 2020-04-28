import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import DailyView from './components/DailyView';
import SocketHandler from './components/SocketHandler';
import axios from 'axios'
import { API_URL } from './constants'

const App = () => {
    const [pairs, setPairs] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/pairing_sessions`)
            .then((response)=> {
                setPairs(response.data)
            })
    }, [setPairs])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <SocketHandler requestedData={pairs.length}>
                <DailyView setPairs={setPairs} pairs={pairs} />
            </SocketHandler>
        </div>
    );
}
export default App;
