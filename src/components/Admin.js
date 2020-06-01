import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { API_URL } from '../constants'

const TeamLink = ({team}) => {
    return (
        <li>
            <Link className='' to={`/team/${team.uuid}`}>
                <span>Name: {team.name}({team.members})</span>
            </Link>
        </li>
    )
}

const Admin = () => {
    const [teams, setTeams] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/teams`)
            .then((response)=> {
                setTeams(response.data)
            })
    }, [])

    return (
        <div className='m-2 col-span-2'>
            <h2>Teams</h2>
            <ul className=''>
                { teams.map((team)=> <TeamLink key={team.uuid} team={team} /> ) }
            </ul>
        </div>
    )
}

export default Admin
