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
import { faChevronLeft, faChevronRight, faQuoteLeft, faQuoteRight, faPlus, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";


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
    // <div className=''>
    //     <FontAwesomeIcon classname='' icon={faQuoteLeft} /> 
    //     <span className='mx-4 text-2xl'>I stay focused on the delivery principles while delivering high quality code.</span>
    //     <span className=''>
    //         <FontAwesomeIcon icon={faQuoteRight} />
    //         <FontAwesomeIcon className='mx-2' icon={faMinus} />
    //         <span className='font-bold text-xl'>EO</span>
    //     </span>
    // </div>

const Feedback = () => {
    return (
        <div className='relative m-4 h-full'>
            <h2 className='text-center mb-4 '>Feedback from <span className=''>{format(new Date(), 'MM/dd/yyyy')}</span> </h2>
            <div className='mx-6'>
                <FontAwesomeIcon icon={faQuoteLeft} /> 
                <p className='text-2xl mx-6'>Sees and zeros in on potential of others, maximizing their value.</p>
                <span className='flex justify-end items-center'>
                    <FontAwesomeIcon icon={faQuoteRight} />
                    <FontAwesomeIcon className='mx-2' icon={faMinus} />
                    <span className='font-bold text-xl'>EO</span>
                </span>
            </div>
            <div className='mx-12 my-6'>
                <ul className='flex flex-wrap'>
                    <li className={`py-1 px-2 my-1 mr-2 border border-gray rounded-full flex items-center justify-center`}>
                        <p className="text-gray font-bold text-xs">Glow</p>
                    </li>
                    <li className={`py-1 px-2 my-1 mr-2 border border-gray rounded-full flex items-center justify-center`}>
                        <p className="text-gray font-bold text-xs">Team Player</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}


const CreateFeedback = ({username}) => {
    const { teamId } = useParams()
    const [selected, setSelected] = useState('')
    const [team, setTeam] = useState({name: '', users: [], roles: []})
    const [feedbackText, setfeedbackText] = useState('Situation-Behavior-Impact...')
    const { register, handleSubmit, errors } = useForm()
    const history = useHistory()

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}`).then((response)=> { setTeam(response.data) })
    }, [teamId])

    const onUpdate = (data) => {
        axios.post(`${API_URL}/team`, data)
             .then((response) => {
                 history.push(`/team/${response.data.uuid}/settings`)
             })
    }
    console.log('Feedback', feedbackText)
    console.log('selected', !!selected)
    const submitText = selected ? `Submit Feedback to ${selected.toUpperCase()}` : 'Submit Feedback'
    const errorClass = errors.name ? 'border border-red' : 'border-b border-gray-border' 

    return (
        <form onSubmit={handleSubmit(onUpdate)}>
            <div className='m-4'>
                <h2 className='text-center'>Give Feedback</h2>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <p className='text-center'>Feedback for </p>
                        <div className='relative appearance-none label-floating my-4'>
                            <select 
                                onChange={(e) => setSelected(e.target.value)} 
                                name='userId' 
                                value={selected || username} 
                                ref={register} 
                                className="outline-none block appearance-none border-b border-gray-border w-full bg-white pl-2 py-2 pr-8 rounded leading-tight"
                            >
                                <option value=''>Select a User</option>
                                { team.users.map((user) => <option key={user.id} className='' value={user.username}>{user.username}</option> ) }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='flex my-2'>
                    <li className={`opacity-50 py-1 px-2 mr-2 border border-gray rounded-full flex items-center justify-center`}>
                        <p className="text-gray font-bold text-xs mr-2">Grow</p>
                        <FontAwesomeIcon size='xs' icon={faPlus} /> 
                    </li>
                    <li className={`py-1 px-2 mr-2 border border-gray rounded-full flex items-center justify-center`}>
                        <p className="text-gray font-bold text-xs mr-2">Glow</p>
                        <FontAwesomeIcon size='xs' icon={faTimes} /> 
                    </li>
                </ul>
                <textarea className='border border-gray-border w-full my-2' value={feedbackText} onChange={(e) => setfeedbackText(e.target.value)} ref={register} />
                <input type='submit' data-cy='team-name-submit' value={submitText} className='bg-green-icon w-full p-3 text-white font-bold' />
            </div>
            { errors.name && <p className='text-red'>Team Name is required</p> }
        </form>
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

                <div className='grid grid-cols-2 col-gap-4 relative'>
                    <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg my-4'>
                        <CreateFeedback username={user.username} />
                    </div>

                    <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg my-4'>
                        <Feedback />
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