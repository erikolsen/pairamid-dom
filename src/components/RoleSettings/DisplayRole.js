import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({action, icon, classes}) => {
    const onClick = (e) => { e.preventDefault(); action() }

    return (
        <button className={`my-2 mx-4 ${classes}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

const DisplayCard = ({role, setEditing, onDelete}) => {
    return (
        <div className='bg-white shadow-lg rounded-lg mr-4 mb-4'>
            <div className='my-2 '>
                <div style={{'backgroundColor': role.color}} className={`p-3 mx-2 border-gray-border flex items-center justify-center`}>
                    <p className="text-white font-bold text-xs">{role.name && role.name.toUpperCase()}</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <IconButton action={()=> onDelete(role.id)} icon={faTrashAlt} classes='text-red' /> 
                <IconButton action={()=> setEditing(true)} icon={faPencilAlt} /> 
            </div>
        </div>
    )
}

const EditCard = ({role, setEditing, onUpdate, onDelete }) => {
    const { register, handleSubmit } = useForm()
    const cancelAction = role.name ? <IconButton action={()=> setEditing(false)} icon={faBan} />  :
                                     <IconButton action={()=> onDelete(role.id)} icon={faTrashAlt} classes='text-red' /> 

    return (
        <div className='bg-white shadow-lg rounded-lg mr-4 mb-4'>
            <form onSubmit={handleSubmit(onUpdate)}>
                <div className='flex justify-between my-2'>
                    <input className={`w-10 h-10 lg:w-12 lg:h-12 mx-2 border-gray-border flex items-center justify-center`} type='color' name="color" defaultValue={role.color} ref={register} />
                    <div className="w-3/4 relative appearance-none label-floating">
                        <input className="w-full border-b border-gray-border pt-1 px-3 leading-normal" id="name" type="text" name="name" placeholder='Role Name' defaultValue={role.name} ref={register} />
                        <label className="absolute block text-green-darker top-0 left-0 w-full px-3 pt-1 leading-normal" htmlFor="name">
                            Role Name
                        </label>
                    </div>
                </div>
                <input className='' type='hidden' name="id" defaultValue={role.id} ref={register} />
                <div className='flex justify-between'>
                    { cancelAction }
                    <input className='m-2 px-2 border border-green rounded text-white bg-green text-xs font-bold' type="submit" value='Save'/>
                </div>
            </form>
        </div>
    )
}

const DisplayRole = ({role, updateRole, onDelete})=> {
    const [editing, setEditing] = useState(!role.name)
    const onUpdate = (data) => {
        updateRole(data)
        setEditing(false)
    }

    return editing ? <EditCard role={role} setEditing={setEditing} onUpdate={onUpdate} onDelete={onDelete} /> : 
                     <DisplayCard role={role} setEditing={setEditing} onDelete={onDelete} />

}

export default DisplayRole
