import React, { useState, useEffect } from 'react'
import DailyView from './DailyView';
import SocketHandler from './SocketHandler';
import axios from 'axios'
import { API_URL } from '../constants'

const Team = () => {
    const [pairs, setPairs] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/pairing_sessions/daily`)
            .then((response)=> {
                setPairs(response.data)
            })
    }, [setPairs])

    return (
        <div className='col-span-7'>
            <SocketHandler requestedData={pairs.length}>
                <DailyView setPairs={setPairs} pairs={pairs} />
            </SocketHandler>
        </div>
    );
}
export default Team;
