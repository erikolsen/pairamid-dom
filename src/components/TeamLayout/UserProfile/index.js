import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../constants'
import { useParams } from 'react-router-dom'
import LabeledPieChart from '../../charts/LabeledPieChart'
import SimpleBarChart from '../../charts/SimpleBarChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import CreateFeedback from './Feedback/CreateFeedback'
import ManageTags from './Feedback/ManageTags'
import ProfileCalendar from './ProfileCalendar'
import {feedback} from './Feedback/testData'

const UserProfile = () => {
    const { teamId, userId } = useParams()
    const [user, setUser] = useState(null)

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/user/${userId}`)
            .then((response)=> {
                setUser(response.data)
            })
    }, [setUser, teamId, userId])

    if (!user) { return null }

    const allSessions = user.active_pairing_sessions
    const totalUsers  = new Set(allSessions.flatMap(ps => ps.users.map(u => u.username)))
    const totalRoles  = new Set(allSessions.flatMap(ps => ps.users.map(u => u.role.name)))

    // const totalFeedbackGiven = feedback.length
    const totalFeedbackRecieved = feedback.length

    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h1>User {user.username}</h1>
                        <h1>{user.team.name}</h1>
                    </div>
                </header>

                <div className='grid grid-cols-2 col-gap-4 row-gap-4'>
                    <Link 
                        className='col-span-2 md:col-span-1 bg-white rounded-lg flex items-center justify-between p-2' 
                        to={{
                            pathname:`/team/${teamId}/users/${userId}/feedback-given`,
                            state: {user: user}
                        }}
                    >
                        <div className={`bg-gray-med col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                            <p className="text-black font-bold text-lg">0</p>
                        </div>
                        <h2 className='text-center'>Monthly Feedback Given</h2>
                        <button className='cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                        </button>
                    </Link>

                    <Link 
                        className='col-span-2 md:col-span-1 bg-white rounded-lg flex items-center justify-between p-2' 
                        to={{
                            pathname:`/team/${teamId}/users/${userId}/feedback-received`,
                            state: {user: user}
                        }}
                    >
                        <div className={`bg-green-500 col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                            <p className="text-black font-bold text-lg">{totalFeedbackRecieved}</p>
                        </div>
                        <h2 className='text-center'>Monthly Feedback Recieved</h2>
                        <button className='cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                        </button>
                    </Link>

                    <div className='col-span-2 lg:col-span-1'>
                        <CreateFeedback user={user} />
                    </div>

                    <div className='col-span-2 lg:col-span-1'>
                        <ManageTags />
                    </div>

                    <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg'>
                        <h2 className='mt-4 text-center'>Pairing Totals</h2>
                        <div className='my-2 flex justify-center'>
                            <div>
                                <div className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}>
                                    <p className='text-center font-bold'>{allSessions.length}</p>
                                </div>
                                <p className='text-center'>Total</p>
                                <p className='text-center'>Sessions</p>
                            </div>
                            <div>
                                <div className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}>
                                    <p className='text-center font-bold'>{totalUsers.size}</p>
                                </div>
                                <p className='text-center'>Different</p>
                                <p className='text-center'>Users</p>
                            </div>
                            <div>
                                <div className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}>
                                    <p className='text-center font-bold'>{totalRoles.size}</p>
                                </div>
                                <p className='text-center'>Unique</p>
                                <p className='text-center'>Roles</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg'>
                        <h2 className='mt-4 text-center'>Pairing Across Roles</h2>
                        <LabeledPieChart user={user} />
                    </div>
                </div>

                <div className='col-span-2 bg-white shadow-lg rounded-lg mb-4'>
                    <h2 className='mt-4 text-center'>Distribution of Pairs</h2>
                    <SimpleBarChart user={user} />
                </div>

                <div className='col-span-2 bg-white shadow-lg rounded-lg mb-4'>
                    <ProfileCalendar pairingSessions={allSessions} username={user.username} />
                </div>
            </section>
        </main>
    )
}

export default UserProfile
