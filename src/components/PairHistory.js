import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'

const colorMapper = {
    "HOME": 'indigo',
    "VISITOR": 'blue'
}

const User = ({user})=> {
    console.log('User', user)
    return (
        <div className={`w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 md:mx-2 border-gray-border rounded-full bg-${colorMapper[user.role]}-400 flex items-center justify-center`}>
            <p className="text-white font-bold text-xs">{user.username.toUpperCase()}</p>
        </div>
    )
}

const Pair = ({pair}) => {
    return (
        <div className='flex justify-center my-2'>
            { pair.users.map((user) => <User user={user} /> ) }
        </div>
    )
}

const Day = ({data}) => {
    const {day, weekday, pairs } = data
    return (
        <div className='border-r-2 border-gray-border'>
            <div className='text-center mb-8'>
                <p className='text-3xl md:text-5xl -mb-4 text-gray-dark'>{day}</p>
                <p className='text-2xl md:text-3xl text-gray-dark'>{weekday}</p>
            </div>
            {pairs.map((pair, i) => <Pair key={i} pair={pair} />)}
        </div>

    )
}

const DateRange = ({history})=> {
    if(history.length === 0) { return null }
    const startDay = history[0].day
    const startMonth = history[0].month
    const endDay = history[history.length-1].day
    const endMonth = history[history.length-1].month
    return (
        <p className='text-xl p-2'>{`${startMonth} ${startDay} - ${endMonth} ${endDay}`}</p>
    )
}

const PairHistory = () => {
    const [history, setHistory] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/pairing_sessions/weekly`)
            .then((response)=> {
                setHistory(response.data)
            })
    }, [setHistory])
        
    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between'>
                        <h1>Pair History</h1>
                        <div>
                            <DateRange history={history} />
                        </div>
                    </div>
                </header>
                <div className='grid grid-cols-5'>
                    {history.map((day, i) => <Day key={i} data={day} />)}
                </div>
            </section>
        </main>

    )
}

export default PairHistory
