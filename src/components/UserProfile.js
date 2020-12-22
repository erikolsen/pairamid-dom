import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'
import { useParams } from 'react-router-dom'
import LabeledPieChart from './charts/LabeledPieChart'
import SimpleBarChart from './charts/SimpleBarChart'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

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

const localizer = momentLocalizer(moment)

const User = (props)=> {
    let username = props.user.username || ''
    let color = props.user.role.color || '#64dfdfff'
    return (
        <div className='mx-px'>
            <div style={{'backgroundColor': color}} className={`bg-gray-med col-span-1 w-8 h-8 border-gray-border rounded-full flex items-center justify-center`}>
                <p className="text-white font-bold text-xs">{username}</p>
            </div>
        </div>
    )
}

const EventComponent = (props)=> {
    let users = props.event.users || []
    return (
        <div className='flex'>
            {users.filter((user) => props.event.username !== user.username).map((user, i) => <User key={i} user={user}/>)}
        </div>
    )
}

const MyCalendar = ({pairingSessions, username}) => {
    let myEventsList = pairingSessions || [] //props.events ? props.events : []
    return (
        <div className='bg-white'>
            <Calendar
                localizer={localizer}
                views={['month']}
                navigate={['back', 'next']}
                events={myEventsList.map((event) => ({...event, username: username}))}
                startAccessor="created_at"
                endAccessor="created_at"
                style={{ height: 500 }}
                components={{
                    eventWrapper: EventComponent,
                    toolbar: CalendarToolbar
                }}
            />
        </div>
    )
}

const UserProfile = ({match}) => {
    const { teamId, userId } = useParams()
    const [user, setUser] = useState({paring_sessions: []})

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/user/${userId}`)
            .then((response)=> {
                setUser(response.data)
            })

    }, [setUser, teamId, userId])

    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h1>User EO</h1>
                        <h1>Mighty Ducks</h1>
                    </div>
                </header>
                <div className='w-full md:flex'>
                    <div className='w-full md:w-1/2 bg-white shadow-lg rounded-lg mr-4 mb-4'>
                        <div className='m-4'>
                            <div style={{'backgroundColor': 'gray'}} className={`bg-gray-med col-span-1 w-12 h-12 border-gray-border rounded-full flex items-center justify-center`}>
                                <p className="text-white font-bold text-xs">EO</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 bg-white shadow-lg rounded-lg ml-4 mb-4'>
                        <h2 className='mt-4 text-center'>Pairing Across Roles</h2>
                        <LabeledPieChart user={user} />
                    </div>
                </div>
                <div>
                    <div className='w-full bg-white shadow-lg rounded-lg mr-4 mb-4'>
                        <h2 className='mt-4 text-center'>Distribution of Pairs</h2>
                        <SimpleBarChart />
                    </div>
                </div>
                <div className='w-full bg-white shadow-lg rounded-lg mr-4 mb-4'>
                    <MyCalendar pairingSessions={user.pairing_sessions} username={user.username} />
                </div>
            </section>
        </main>
    )
}

export default UserProfile