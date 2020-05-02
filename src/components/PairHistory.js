import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'
const isNum = (el) => parseInt(el) === el

const Cell = ({data, color}) => {
    return (
        <td className={`border border-black text-center bg-${color}`}>{data}</td>
    )
}

const Row = ({row}) => {
    const user = row.slice(0,1)
    const cells = row.slice(1)
    const totalSessions = cells.filter(isNum).reduce((total, count) => total += count) 
    const average = Math.round(totalSessions / cells.length) || '1'

    const getColor = (data) => { 
        if(data === '-'){ return 'gray-med'}
        if(data === 0 || data < Math.round(average/2)) { return 'green' }
        if(data > Math.round(average*2)) { return 'red' }
        return 'yellow'
    }

    return (
        <tr>
            <td className='border border-black text-center text-xl font-bold'>{user}</td>
            {cells.map((cell, i)=> <Cell key={i} data={cell} color={getColor(cell)} />)}
        </tr>
    )
}

const PairHistory = () => {
    const [history, setHistory] = useState({header: [], pairs: []})
    const [primary, setPrimary] = useState('HOME')
    const [secondary, setSecondary] = useState('VISITOR')


    useEffect(()=> {
        axios.get(`${API_URL}/history?primary=${primary}&secondary=${secondary}`)
            .then((response)=> {
                setHistory(response.data)
            })
    }, [setHistory, primary, secondary])
        
    return (
        <main className="bg-gray-light col-span-7 p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='flex items-center'>
                        <h1>Pair History</h1>
                    </div>
                </header>
                <div className=''>
                    <div className='my-4 justify-between flex'>
                        <form>
                            <p className='text-xl font-bold mb-2'>Compare Roles</p>
                            <div className='flex'>
                                <label className='py-2 pr-2'>
                                    Role1:
                                    <select className='p-2 bg-white' value={primary} onChange={(e) => setPrimary(e.target.value)}>
                                        <option value="">ALL</option>
                                        <option value="HOME">Home</option>
                                        <option value="VISITOR">Visitor</option>
                                    </select>
                                </label>
                                <label className='py-2 pr-2'>
                                    Role2:
                                    <select className='p-2 bg-white' value={secondary} onChange={(e) => setSecondary(e.target.value)}>
                                        <option value="">ALL</option>
                                        <option value="HOME">Home</option>
                                        <option value="VISITOR">Visitor</option>
                                    </select>
                                </label>
                            </div>
                        </form>
                        <div>
                            <p className='text-xl font-bold text-center'>Legend</p>
                            <div className='flex'>
                                <div className='bg-green p-2'>Pair More</div>
                                <div className='bg-yellow p-2'>Just Right</div>
                                <div className='bg-red p-2'>Pair Less</div>
                            </div>
                        </div>
                    </div>
                    <table className='table-auto w-full my-4'>
                        <thead>
                            <tr className=''>
                                { history.header.map((user, key) => <td key={key} className='border border-black text-center text-xl font-bold'>{user}</td>) }
                            </tr>
                        </thead>
                        <tbody>
                            {history.pairs.map((row, i) => <Row key={i} row={row} />)}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>

    )
}

export default PairHistory
