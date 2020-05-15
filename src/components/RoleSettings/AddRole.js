import React, { useState } from 'react'
import RoleForm from './RoleForm'

const AddRole = ({action}) => {
    const [adding, setAdding] = useState(false)
    const NEW_ROLE = {name: '', color: '#08697A', id: null}
    const onUpdate = (data) => {
        setAdding(false)
        action(data)
    }

    if (adding) {
        return (
            <div className='flex'>
                <RoleForm role={NEW_ROLE} updateRole={onUpdate} />
                <button onClick={()=> setAdding(false)}>Cancel</button>
            </div>
        )
    } else {
        return (
            <button onClick={() => setAdding(true)} className='flex items-center'>
                <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                <span className='mx-2 text-gray'>Add Role</span>
            </button>
        )
    }
}

export default AddRole
