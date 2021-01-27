import React from 'react'
import SimpleRadialBarChart from '../../charts/SimpleRadialBarChart'
import { formatReminders } from './utils'
import { format } from 'date-fns'

const Role = ({role}) => {
    return (
        <div className='flex items-center col-span-1'>
            <div style={{'backgroundColor': role.color}} className='h-4 w-4 my-2 mr-2'></div>
            <p>{role.name}-{role.percent}%</p>
        </div>
    )
}

const RolesAtRisk = ({roles})=> {
    return (
        <div className='m-4'>
            <div className='border-b-2 border-gray-border my-2' />
            <p className='font-bold text-xl mt-4 text-center'>Roles at Risk</p>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {roles.map(role => <Role key={role.name} role={role} />)}
            </div>
        </div>
    )
}

const UtilizationByRole = ({reminders, team, startDate, endDate}) => {
    const roles = formatReminders(reminders, team, startDate, endDate)
    const displayDate = date => format(date, 'MM/dd/yyyy')
    const rolesAtRisk = roles.filter(role => parseFloat(role.percent) <= 75)

    return (
        <div className='bg-white shadow-lg rounded-lg'>
            <p className='font-bold text-xl mt-4 text-center'>Utilization by Role</p>
            <p className='text-xl mb-2 text-center'>{displayDate(startDate)}-{displayDate(endDate)}</p>
            <SimpleRadialBarChart data={roles} />
            { !!rolesAtRisk.length && <RolesAtRisk roles={rolesAtRisk} /> }
        </div>
    )
}

export default UtilizationByRole
