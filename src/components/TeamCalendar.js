import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'
import { API_URL } from '../constants'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReminderForm = ({onUpdate, team, date}) => {
    const { register, handleSubmit, reset } = useForm()
    const [selected, setSelected] = useState('')
    
    const onSubmit = (data) => {
        onUpdate(data)
        reset()
        setSelected('')
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-4 col-span-1 relative'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-between items-center'>
                    <div className='text-xl font-semibold mb-4'>
                        <span>Add Reminder for </span>
                        <span>{localDate(date[0])}</span>
                        {spanOfDays(date[0], date[1]) && <span className=''>-{localDate(date[1])}</span>}
                    </div>
                </div>

                <div className='relative'>
                    <select 
                        onChange={(e) => setSelected(e.target.value)} 
                        name='userId' 
                        value={selected} 
                        ref={register} 
                        className="block appearance-none w-full bg-white border border-gray-border pl-2 py-2 pr-8 rounded leading-tight"
                    >
                        <option value=''>Select a User</option>
                        { team.users.map((user) => <option key={user.id} className='' value={user.id}>{user.username}</option> ) }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                <div className='my-4'>
                    <p>Reminder Message</p>
                    <input 
                        className={`w-full p-2 leading-normal border border-gray-border outline-none`}
                        id='message' 
                        type='text' 
                        name='message' 
                        placeholder='Message' 
                        defaultValue={'Out of Office'} 
                        ref={register} 
                    />
                </div>

                <input 
                    className='absolute bottom-0 right-0 m-4 p-2 border border-green rounded text-white bg-green font-bold' 
                    type="submit" 
                    value='Add Event'
                />
            </form>
        </div>
    )
}

const localDate = date => date ? date.toLocaleDateString('en-US') : ''
const spanOfDays = (d1, d2) => (localDate(d1) !== localDate(d2))

const IconButton = ({action, icon, classes}) => {
    const onClick = (e) => { e.preventDefault(); action() }

    return (
        <button className={`my-2 mx-4 ${classes}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

const DisplayCard = ({onDelete, reminder}) => {
    const color = reminder.user ? reminder.user.role.color : 'gray'

    return (
        <div className='bg-white shadow-lg rounded-lg mb-4 col-span-1 flex justify-between'>
            <div className='flex'>
                <div style={{'backgroundColor': color}} className={`my-4 bg-gray-med w-12 h-12 mx-2 border-gray-border rounded-full flex items-center justify-center`}>
                    <p className="text-white font-bold text-xs">{reminder.user ? reminder.user.username : 'TEAM'}</p>
                </div>
                <div className='my-4'>
                    <p className='text-lg font-semibold mx-2 flex items-center text-gray'>{reminder.message}</p>
                    <div className='text-sm mx-2 flex justify-between'>
                        <span>{reminder.start_date}</span>
                        {(reminder.start_end !== reminder.end_date) && <span>-{reminder.end_date}</span>}
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <IconButton action={()=> onDelete(reminder.id)} icon={faTrashAlt} classes='text-red' /> 
            </div>
        </div>
    )
}

const TeamCalendar = () => {
    const { teamId } = useParams()
    const [team, setTeam] = useState({name: '', users: [], reminders: []})
    const [date, setDate] = useState([new Date(), new Date()])
    const [reminders, setReminders] = useState(team.reminders)

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}`)
            .then((response)=> {
                setTeam(response.data)
                setReminders(response.data.reminders)
            })
    }, [teamId])

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/reminders?date=${date}`)
            .then((response)=> {
                console.log('Response', response)
            })
    }, [teamId, date])

    const onUpdate = (data)=> {
        const payload = {
            ...data, 
            startDate: date[0], 
            endDate: date[1],
            teamId: team.id
        }
        axios.post(`${API_URL}/team/${teamId}/reminder`, payload)
            .then((response)=> {
                setReminders([...reminders, response.data])
            })
    }

    const onDelete = (id) => {
        axios.delete(`${API_URL}/team/${teamId}/reminder/${id}`)
             .then((response) => {
                 setReminders(reminders.filter((reminder) => reminder.id !== parseInt(response.data)))
             })
    }

    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h1>{team.name} Calendar</h1>
                    </div>
                </header>

                <div className='grid grid-cols-2 col-gap-4'>
                    <div className='bg-white shadow-lg rounded-lg p-4 col-span-1'>
                        <div className='flex justify-center'>
                            <Calendar 
                                className='p-2'
                                calendarType='US'
                                onChange={(e)=> setDate(e)} 
                                selectRange={true}
                                returnValue='range'
                                value={date}
                            />
                        </div>
                    </div>
                    <ReminderForm team={team} onUpdate={onUpdate} date={date} />
                </div>

                <div className='my-4'>
                    <h2>Reminders:</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-gap-4'>
                        { reminders.map((reminder)=> <DisplayCard key={reminder.id} reminder={reminder} onDelete={onDelete} /> ) }
                    </div>
                </div>

            </section>
        </main>

    )
}

export default TeamCalendar
