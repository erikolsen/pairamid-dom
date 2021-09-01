import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../constants'
import { subMonths, formatISO, format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'

const FrequencyTable = ({startDate, endDate, primary, secondary}) => {
    const { teamId } = useParams()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const fDate = date => formatISO(date, { representation: 'date' })
    const totalsForUser = (user) => Object.values(user.frequencies).reduce((total, count) => { return total += count}, 0) 

    useEffect(()=> {
        setLoading(true)
        axios.get(`${API_URL}/team/${teamId}/frequency?startDate=${fDate(startDate)}&endDate=${fDate(endDate)}`)
            .then((response)=> {
                setUsers(response.data)
                setLoading(false)
            })
    }, [startDate, endDate])

    const XUsers = secondary ? users.filter(user => user.roleName === secondary) : users
    const YUsers = primary ? users.filter(user => user.roleName === primary) : users

    if (loading){
        return <div>Loading...</div>
    }
        
    return(
        <table className='table-auto w-full'>
            <thead>
                <tr className=''>
                    <td></td>
                    {XUsers.map(user => (<td className='text-center font-bold' key={user.username}>{user.username}</td>))}
                </tr>
            </thead>
            <tbody>
                {YUsers.map(user => (
                    <tr key={user.username}>
                        <td className='text-left font-bold'>{user.username}: {totalsForUser(user)}</td>
                        {XUsers.map(u=> (
                            <td className={`border border-black text-center text-xl bg-${getColor(user, u.username, XUsers.length)}`} key={u.username}>{user.frequencies[u.username] || 0}</td>
                        ))}
                    </tr>)
                )}
            </tbody>
        </table>
    )
}

const RoleSelect = ({roles, label, selected, onSelect}) => {
    const options = roles.map((role) => <option key={role.id} value={role.name}>{role.name}</option> )
    return (
        <label className='py-2 pr-2'>
            {label}:
            <select className='bg-white' value={selected} onChange={(e) => onSelect(e.target.value)}>
                <option value="">ALL</option>
                { options }
            </select>
        </label>
    )
}

const getColor = (primary, secondary, totalPairs) => { 
    const frequencies = Object.values(primary.frequencies)
    const average = Math.round(frequencies.reduce((total, count) => { return total += count}, 0) / totalPairs)
    const totalPerUser = primary.frequencies[secondary] || 0

    if(primary.username === secondary){ return 'gray-med'}
    if(totalPerUser === 0 || totalPerUser < Math.round(average/2)) { return 'yellow' }
    if(totalPerUser > Math.round(average*2)) { return 'red' }
    return 'green'
}

const PairFrequency = () => {
    const { teamId } = useParams()
    const [roles, setRoles] = useState([])

    const [primary, setPrimary] = useState()
    const [secondary, setSecondary] = useState()

    const [showCalendar, setShowCalendar] = useState(false)
    const today = new Date()
    const [dateRange, setDateRange] = useState([subMonths(today, 1), today])
    const [startDate, endDate] = dateRange
    const calendarDisplay = showCalendar ? 'block' : 'hidden'


    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/roles`)
            .then((response)=> {
                setRoles(response.data)
            })
    }, [])


    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border md:flex md:flex-wrap justify-between items-baseline mb-4'>
                    <div className='flex items-center'>
                        <p className='text-2xl font-bold'>Pair Frequency</p>
                    </div>
                    <div>
                        <div className='flex items-center cursor-pointer' onClick={()=> setShowCalendar(!showCalendar)}>
                            <h2 className='mr-2 md:mx-2'>{format(startDate, 'MM/dd/yyyy')}-{format(endDate, 'MM/dd/yyyy')}</h2>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </div>
                        <div className={`flex justify-center ${calendarDisplay}`}>
                            <Calendar 
                                className='p-2'
                                calendarType='US'
                                onChange={(e)=> setDateRange(e)} 
                                selectRange={true}
                                returnValue='range'
                                value={dateRange}
                            />
                        </div>
                    </div>
                </header>
                <div className=''>
                    <div className='my-4 md:justify-between md:flex'>
                        <form>
                            <p className='text-xl font-bold mb-2'>Compare Roles</p>
                            <div className='flex justify-between'>
                                <RoleSelect label='X Axis' roles={roles} onSelect={setSecondary} selected={secondary} />
                                <RoleSelect label='Y Axis' roles={roles} onSelect={setPrimary} selected={primary} />
                            </div>
                        </form>
                        <div>
                            <p className='text-xl font-bold text-center'>Legend</p>
                            <div className='grid grid-cols-4 text-center'>
                                <div className='bg-yellow p-2'>Pair More</div>
                                <div className='bg-green p-2'>Just Right</div>
                                <div className='bg-red p-2'>Pair Less</div>
                                <div className='bg-gray-med p-2'>Solo</div>
                            </div>
                        </div>
                    </div>
                    <FrequencyTable 
                        startDate={startDate}
                        endDate={endDate}
                        primary={primary}
                        secondary={secondary}
                    />
                </div>
            </section>
        </main>
    )
}

export default PairFrequency
