import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons'

const DisplayCard = ({role, setEditing, onDelete}) => {
    return (
        <div className='bg-white shadow-lg rounded-lg mr-2'>
            <div className='flex my-2 flex-wrap'>
                <div style={{'backgroundColor': role.color}} className={`w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 md:m-1 border-gray-border rounded-full flex items-center justify-center`}>
                    <p className="text-white font-bold text-xs">AB</p>
                </div>
                <p className='text-lg flex items-center my-2 mx-4 text-gray'>{role.name}</p>
            </div>
            <div className='flex justify-between'>
                <button className='m-2' onClick={()=> setEditing(true)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button className='m-2 text-red' onClick={()=> onDelete(role.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    )
}

const EditCard = ({role, setEditing, onUpdate }) => {
    const { register, handleSubmit } = useForm()
    return (
        <div className='bg-white shadow-lg rounded-lg mr-2 whee'>
            <form onSubmit={handleSubmit(onUpdate)}>
                <div className='flex justify-between'>
                    <input className={`w-6 h-6 md:w-12 md:h-10 lg:w-12 lg:h-12 md:my-3 mx-1 border-gray-border flex items-center justify-center`} type='color' name="color" defaultValue={role.color} ref={register} />
                    <div className="mt-3 w-3/4 relative rounded appearance-none label-floating">
                        <input className="w-full border-b border-gray-border pt-1 px-3 text-green-darker leading-normal rounded" id="name" type="text" name="name" placeholder='Role Name' defaultValue={role.name} ref={register} />
                        <label className="absolute block text-green-darker top-0 left-0 w-full px-3 pt-1 leading-normal" htmlFor="name">
                            Role Name
                        </label>
                    </div>
                </div>
                <input className='' type='hidden' name="id" defaultValue={role.id} ref={register} />
                <div className='flex justify-between'>
                    <button className='m-2' onClick={()=> setEditing(false)}>
                        <FontAwesomeIcon icon={faBan} />
                    </button>
                    <input className='m-2 px-2 border border-green rounded text-white bg-green text-xs font-bold' type="submit" value='Save'/>
                </div>
            </form>
        </div>
    )
}

const DisplayRole = ({role, updateRole, onDelete})=> {
    const [editing, setEditing] = useState(!role.name)
    const onUpdate = (data) => {
        setEditing(false)
        updateRole(data)
    }

    return editing ? <EditCard role={role} setEditing={setEditing} onUpdate={onUpdate} /> : 
                     <DisplayCard role={role} setEditing={setEditing} onDelete={onDelete} />

}

export default DisplayRole
