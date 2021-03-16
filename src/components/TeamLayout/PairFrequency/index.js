import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { formatISO, subMonths, format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import { API_URL } from '../../../constants'
import Row from './Row'
import RoleSelect from './RoleSelect'

const PairFrequency = () => {
    const today = new Date()
    const fDate = date => formatISO(date, { representation: 'date' })
    const { teamId } = useParams()
    const [frequency, setFrequency] = useState({header: [], pairs: []})
    const [primary, setPrimary] = useState('VISITOR-DEV')
    const [secondary, setSecondary] = useState('HOME-DEV')
    const [dateRange, setDateRange] = useState([subMonths(today, 1), today])
    const [showCalendar, setShowCalendar] = useState(false)
    let [startDate, endDate] = dateRange

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/frequency?primary=${primary}&secondary=${secondary}&startDate=${fDate(startDate)}&endDate=${fDate(endDate)}`)
            .then((response)=> {
                setFrequency(response.data)
            })
    }, [setFrequency, dateRange, primary, secondary, teamId, startDate, endDate])
        
    let calendarDisplay = showCalendar ? 'block' : 'hidden'
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
                                <RoleSelect label='Role1' onSelect={setPrimary} selected={primary} />
                                <RoleSelect label='Role2' onSelect={setSecondary} selected={secondary} />
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
                    <table className='table-auto w-full my-4'>
                        <thead>
                            <tr className=''>
                                { frequency.header.map((user, key) => <td key={key} className='text-center text-xl font-bold'>{user}</td>) }
                            </tr>
                        </thead>
                        <tbody>
                            {frequency.pairs.map((row, i) => <Row key={i} row={row} header={frequency.header} />)}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default PairFrequency
