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

const RoleSelect = ({label, selected, onSelect}) => {
    const [roles, setRoles] = useState([])
    useEffect(()=> {
        axios.get(`${API_URL}/roles`)
            .then((response)=> {
                setRoles(response.data)
            })
    }, [setRoles])

    const options = roles.map((role) => <option value={role.name}>{role.name}</option> )

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

const PairFrequency = () => {
    const [frequency, setFrequency] = useState({header: [], pairs: []})
    const [primary, setPrimary] = useState('HOME')
    const [secondary, setSecondary] = useState('VISITOR')


    useEffect(()=> {
        axios.get(`${API_URL}/frequency?primary=${primary}&secondary=${secondary}`)
            .then((response)=> {
                setFrequency(response.data)
            })
    }, [setFrequency, primary, secondary])
        
    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='flex items-center'>
                        <h1>Pair Frequency</h1>
                    </div>
                </header>
                <div className=''>
                    <div className='my-4 md:justify-between md:flex'>
                        <form>
                            <p className='text-xl font-bold mb-2'>Compare Roles</p>
                            <div className='grid grid-cols-2'>
                                <RoleSelect label='Role1' onSelect={setPrimary} selected={primary} />
                                <RoleSelect label='Role2' onSelect={setSecondary} selected={secondary} />
                            </div>
                        </form>
                        <div>
                            <p className='text-xl font-bold text-center'>Legend</p>
                            <div className='grid grid-cols-3 text-center'>
                                <div className='bg-green p-2'>Pair More</div>
                                <div className='bg-yellow p-2'>Just Right</div>
                                <div className='bg-red p-2'>Pair Less</div>
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
                            {frequency.pairs.map((row, i) => <Row key={i} row={row} />)}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>

    )
}

export default PairFrequency
