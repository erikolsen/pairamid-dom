import React from 'react'

const isNum = (el) => parseInt(el) === el
const Cell = ({data, color}) => {
    return (
        <td className={`border border-black text-center bg-${color}`}>{data}</td>
    )
}

const Row = ({row, header}) => {
    const user = row.slice(0,1)[0]
    const cells = row.slice(1)
    const totalSessions = cells.filter(isNum).reduce((total, count) => { return total += count}, 0) 
    const average = Math.round(totalSessions / cells.length) || '1'

    const soloColumn = index =>  header[index+1]===user
    const getColor = (data, soloColumn) => { 
        if(soloColumn){ return 'gray-med'}
        if(data === 0 || data < Math.round(average/2)) { return 'yellow' }
        if(data > Math.round(average*2)) { return 'red' }
        return 'green'
    }
    return (
        <tr>
            <td className='border border-black text-center text-xl font-bold'>{user + ' : ' + totalSessions}</td>
            {cells.map((cell, i)=> <Cell key={i} data={cell} color={getColor(cell, soloColumn(i))} />)}
        </tr>
    )
}

export default Row;
