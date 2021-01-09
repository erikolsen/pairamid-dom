import React, { useState, useEffect } from 'react'
import DailyView from './DailyView';
import SocketHandler from './SocketHandler';
import axios from 'axios'
import { API_URL } from '../../../constants'
import { useParams } from 'react-router-dom'

const Team = () => {
    const { teamId } = useParams()
    const [pairs, setPairs] = useState([])
    const [team, setTeam] = useState(null)

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}`)
            .then((response)=> {
                setTeam(response.data)
            })

        axios.get(`${API_URL}/team/${teamId}/pairing_sessions/daily`)
            .then((response)=> {
                setPairs(response.data)
            })
    }, [setPairs, teamId, setTeam])

    return (
        <div className='col-span-7'>
            <SocketHandler requestedData={pairs.length}>
                <DailyView setPairs={setPairs} pairs={pairs} team={team} />
            </SocketHandler>
        </div>
    );
}
export default Team;
