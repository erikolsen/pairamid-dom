import React, { useState } from 'react'
import RoleForm from './RoleForm'

const DisplayRole = ({role, updateRole, onDelete})=> {
    const [editing, setEditing] = useState(false)
    const onUpdate = (data) => {
        setEditing(false)
        updateRole(data)
    }

    if(editing) {
        return (
            <div className='flex'>
                <RoleForm role={role} updateRole={onUpdate} />
                <button onClick={()=> setEditing(false)}>Cancel</button>
            </div>
        )
    } else {
        return (
            <div className='flex'>
                <p style={{'backgroundColor': role.color}} className='p-2 w-1/4'>{role.name}</p>
                <button className='mx-2' onClick={()=> setEditing(true)}>Edit</button>
                <button className='text-red' onClick={()=> onDelete(role.id)}>Delete</button>
            </div>
        )
    }
}

export default DisplayRole
