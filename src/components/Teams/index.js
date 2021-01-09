import React, { useState, useEffect } from 'react'
import logo from '../../assets/pairamid-logo.png';
import { Link } from "react-router-dom";
import axios from 'axios'
import { API_URL } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const TeamCard = ({team})=> {
    return (
        <Link className='' to={`/team/${team.uuid}`}>
            <div className='bg-white shadow-lg rounded-lg w-full p-4 col-span-1 my-4 flex items-center justify-between'>
                <div 
                    style={{'backgroundColor': team.roles[0].color}} 
                    className={`bg-gray-med w-16 h-16 my-2 border-gray-border rounded-full flex items-center justify-center`}
                >
                    <div className='text-3xl text-gray-light'>
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                </div>
                <div className='text-center mx-8'>
                    <p className='font-bold text-xl'>{team.name}</p>
                    <p className='text-center'>{team.members} Members</p>
                </div>
            </div>
        </Link>
    )
}

const Teams = () => {
    const [teams, setTeams] = useState([])
    let teamIds = localStorage.getItem('pairamid-teams') || ''

    useEffect(()=> {
        axios.get(`${API_URL}/teams`)
            .then((response)=> {
                setTeams(response.data.filter((team)=> teamIds.includes(team.uuid)))
            })
    }, [setTeams, teamIds])

    return (
        <main>
            <header className='flex items-center justify-between border-gray-border border-b-2 w-screen'>
                <Link className='' to={'/'}>
                    <div className='my-4 mx-4 sm:mx-16'>
                        <img src={logo} alt='Paramid Logo' width='169' height='40' className='w-full max-w-logo' />
                    </div>
                </Link>
                <h1 className='my-4 mx-4 sm:mx-16'>Teams</h1>
            </header>

            <section className='bg-gray-light h-screen'>
                <div className=''>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 mx-4 sm:mx-16'>
                        { teams.map(team => <TeamCard key={team.uuid} team={team} />) }
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Teams;
