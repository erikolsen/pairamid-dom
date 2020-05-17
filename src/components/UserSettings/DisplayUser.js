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

const DisplayCard = ({user, setEditing, onDelete}) => {
    const color = user.role ? user.role.color : 'gray'
    const roleName = user.role ? user.role.name : ''
    return (
        <div className='bg-white shadow-lg rounded-lg mr-4 mb-4'>
            <div className='flex my-2 '>
                <div style={{'backgroundColor': color}} className={`w-12 h-12 mx-2 border-gray-border rounded-full flex items-center justify-center`}>
                    <p className="text-white font-bold text-xs">{user.username}</p>
                </div>
                <p className='text-lg flex items-center my-2 mx-4 text-gray'>Role: {roleName}</p>
            </div>
            <div className='flex justify-between'>
                <IconButton action={()=> onDelete(user.id)} icon={faTrashAlt} classes='text-red' /> 
                <IconButton action={()=> setEditing(true)} icon={faPencilAlt} /> 
            </div>
        </div>
    )
}

const EditCard = ({user, roles, setEditing, onUpdate, onDelete }) => {
    const { register, handleSubmit } = useForm()
    const [initials, setInitials] = useState(user.username || '')
    const [roleId, setRoleId] = useState(user.role ? user.role.id : '')
    const selectedRole = roles.find((role) => role.id === parseInt(roleId))
    const color = selectedRole ? selectedRole.color : 'gray'
    const cancelAction = user.username ? <IconButton action={()=> setEditing(false)} icon={faBan} />  :
                                         <IconButton action={()=> onDelete(user.id)} icon={faTrashAlt} classes='text-red' /> 

    return (
        <div className='bg-white shadow-lg rounded-lg mr-4 mb-4'>
            <form onSubmit={handleSubmit(onUpdate)}>
                <div className=''>
                    <div className='grid grid-cols-4 mx-2 my-4 flex items-center'>
                        <div style={{'backgroundColor': color}} className={`col-span-1 w-10 h-10 border-gray-border rounded-full flex items-center justify-center`}>
                            <p className="text-white font-bold text-xs">{initials.toUpperCase()}</p>
                        </div>
                        <div className='col-span-3'>
                            <div className="relative appearance-none label-floating">
                                <input 
                                    className="w-full border-b border-gray-border pt-1 px-3 leading-normal" 
                                    onChange={(e) => setInitials(e.target.value)} 
                                    id="initials" 
                                    type="text" 
                                    name="initials" 
                                    placeholder='Initials' 
                                    defaultValue={user.username} 
                                    ref={register} 
                                />
                                <label className="absolute block text-green-darker top-0 left-0 w-full px-3 pb-2 leading-normal" htmlFor="initials">
                                    Initials
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4'>
                        <p className='col-span-1'></p>
                        <div className='relative col-span-3 mr-2'>
                            <select 
                                onChange={(e) => setRoleId(e.target.value)} 
                                name='roleId' 
                                value={roleId} 
                                ref={register} 
                                className="block appearance-none w-full bg-white border-b border-gray-border px-2 pb-2 pr-8 rounded leading-tight"
                            >
                                <option value=''>Select a Role</option>
                                { roles.map((role) => <option key={role.id} className='' value={role.id}>{role.name}</option> ) }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <input className='' type='hidden' name="userId" defaultValue={user.id} ref={register} />
                <div className='flex justify-between'>
                    { cancelAction }
                    <input className='m-2 px-2 border border-green rounded text-white bg-green text-xs font-bold' type="submit" value='Save'/>
                </div>
            </form>
        </div>
    )
}

const DisplayUser = ({user, roles, updateUser, onDelete})=> {
    const [editing, setEditing] = useState(!user.username)
    const onUpdate = (data) => {
        updateUser(data)
        setEditing(false)
    }

    return editing ? <EditCard user={user} roles={roles} setEditing={setEditing} onUpdate={onUpdate} onDelete={onDelete} /> : 
                     <DisplayCard user={user} setEditing={setEditing} onDelete={onDelete} />

}

export default DisplayUser
