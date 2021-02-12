import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../constants'
import { useParams } from 'react-router-dom'
import LabeledPieChart from '../../charts/LabeledPieChart'
import SimpleBarChart from '../../charts/SimpleBarChart'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


class CalendarToolbar extends React.Component {
    render() {
        return (
            <div className="flex justify-between m-4">
                <button
                    className="p-1 text-xs"
                    type="button"
                    onClick={() => this.props.onNavigate('PREV')}
                >
                  <FontAwesomeIcon icon={faChevronLeft} /> 
                  <span className='mx-2'>PREV</span>
                </button>
                <span
                    className="flex items-center"
                    onClick={() => this.props.onNavigate('TODAY')}
                >
                    {this.props.label}
                </span>
                <button
                    className="p-1 text-xs"
                    type="button"
                    onClick={() => this.props.onNavigate('NEXT')}
                >
                  <span className='mx-2'>NEXT</span>
                  <FontAwesomeIcon icon={faChevronRight} /> 
                </button>
            </div>
        );
    }
}


const User = (props)=> {
    let username = props.user.username || ''
    let color = props.user.role.color || '#64dfdfff'
    return (
        <div className='mx-px'>
            <div style={{'backgroundColor': color}} className={`bg-gray-med col-span-1 w-6 h-6 md:w-8 md:h-8 border-gray-border rounded-full flex items-center justify-center`}>
                <p className="text-white font-bold text-xs">{username}</p>
            </div>
        </div>
    )
}

const UserLarge = (props)=> {
    let username = props.user.username || ''
    let color = props.user.role.color || '#64dfdfff'
    return (
        <div className='mx-px'>
            <div style={{'backgroundColor': color}} className={`bg-gray-med col-span-1 w-8 h-8 md:w-10 md:h-10 border-gray-border rounded-full flex items-center justify-center`}>
                <p className="text-white font-bold text-xs">{username}</p>
            </div>
        </div>
    )
}

const EventComponent = (props)=> {
    let users = props.event.users || []
    return (
        <div className='grid grid-cols-2 md:grid-cols-3'>
            {users.filter((user) => props.event.username !== user.username).map((user, i) => <User key={i} user={user}/>)}
        </div>
    )
}

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

const MyCalendar = ({pairingSessions, username}) => {
    let myEventsList = pairingSessions || [] 
    return (
        <div className='bg-white'>
            <Calendar
                localizer={localizer}
                views={['month']}
                navigate={['back', 'next']}
                events={myEventsList.map((event) => ({...event, username: username}))}
                startAccessor="created_at"
                endAccessor="created_at"
                style={{ height: 600 }}
                components={{
                    eventWrapper: EventComponent,
                    toolbar: CalendarToolbar
                }}
            />
        </div>
    )
}


const UserProfile = () => {
    const defaultUser = {active_pairing_sessions: [], username: '', team: {name: ''}}
    const { teamId, userId } = useParams()
    const [user, setUser] = useState(defaultUser)

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/user/${userId}`)
            .then((response)=> {
                setUser(response.data)
            })
    }, [setUser, teamId, userId])

    const allSessions = user && user.active_pairing_sessions
    const totalUsers = user && new Set(allSessions.flatMap(ps => ps.users.map(u => u.username)))
    const totalRoles = user && new Set(allSessions.flatMap(ps => ps.users.map(u => u.role.name)))

    return user && (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h1>User {user.username}</h1>
                        <h1>{user.team.name}</h1>
                    </div>
                </header>

                <div className='grid grid-cols-2 col-gap-4'>
                    <Link className='flex items-center justify-between bg-white shadow-lg rounded-lg my-4 p-2' to={`/team/${teamId}/users/${userId}/feedback-given`}>
                        <div className={`bg-gray-med col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                            <p className="text-black font-bold text-lg">0</p>
                        </div>
                        <h2 className='text-center'>Monthly Feedback Given</h2>
                        <button className='cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                        </button>
                    </Link>
                    <Link className='flex items-center justify-between bg-white shadow-lg rounded-lg my-4 p-2' to={`/team/${teamId}/users/${userId}/feedback-received`}>
                        <div className={`bg-green-500 col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                            <p className="text-black font-bold text-lg">3</p>
                        </div>
                        <h2 className='text-center'>Monthly Feedback Recieved</h2>
                        <button className='cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                        </button>
                    </Link>

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
                    <MyCalendar pairingSessions={allSessions} username={user.username} />
                </div>
            </section>
        </main>
    )
}

export default UserProfile

                // <div className='w-1/2 bg-white shadow-lg rounded-lg mr-4 mb-4'>
                //     <h2 className='mt-4 text-center'>Whee</h2>
                //     <div className='m-4'>
                //         <FontAwesomeIcon icon={faQuoteLeft} className='text-left'/> 
                //         <p className='m-2'>
                //             I stay focused on the delivery principles while delivering high quality code.
                //         </p>
                //         <FontAwesomeIcon icon={faQuoteRight} /> 
                //     </div>
                //     <div className='border-b-2 border-gray-border m-4' />
                //     <div className='grid grid-cols-3 gap-x-3'>
                //         <div 
                //             style={{'backgroundColor': 'lightgreen'}} 
                //             className={`bg-gray-med p-1 m-2 border-gray-border rounded-full flex items-center justify-center`}>
                //             <p className="text-white font-bold text-xs">Embrace Change</p>
                //         </div>
                //         <div 
                //             style={{'backgroundColor': 'blue'}} 
                //             className={`bg-gray-med p-1 m-2 border-gray-border rounded-full flex items-center justify-center`}>
                //             <p className="text-white font-bold text-xs">Passion</p>
                //         </div>
                //         <button className={`bg-blue-200 hover:bg-blue-400 p-1 m-2 border border-black rounded-full flex items-center justify-center`}>
                //             <svg class="" width="12" height="20" fill="currentColor">
                //                 <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                //             </svg>
                //             <span className='mx-2 text-gray'>Add Tag</span>
                //         </button>
                //     </div>
                // </div>