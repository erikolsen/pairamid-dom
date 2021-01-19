import React from 'react'
import SimpleRadialBarChart from '../../charts/SimpleRadialBarChart'
import { formatReminders } from './utils'
import { format } from 'date-fns'

const UtilizationByRole = ({reminders, team, startDate, endDate}) => {
    const roles = formatReminders(reminders, team, startDate, endDate)
    const displayDate = date => format(date, 'MM/dd/yyyy')

    return (
        <div className='bg-white shadow-lg rounded-lg'>
            <p className='font-bold text-xl mt-4 text-center'>Utilization by Role</p>
            <p className='text-xl mb-2 text-center'>{displayDate(startDate)}-{displayDate(endDate)}</p>
            <SimpleRadialBarChart data={roles} />
        </div>
    )
}

export default UtilizationByRole
