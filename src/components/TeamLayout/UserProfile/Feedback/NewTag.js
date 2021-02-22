import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({action, icon, classes, title}) => {
    const onClick = (e) => { e.preventDefault(); action() }

    return (
        <button data-cy={title} className={`focus:outline-none my-2 mx-2 ${classes}`} onClick={onClick} title={title}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}
            // <div className='mt-2 '>
            //     <div style={{'backgroundColor': tag.color}} className={`cursor-pointer py-1 px-5 mx-2 rounded-full flex items-center justify-center`}>
            //         <p className="text-black font-bold text-xs">{tag.name && tag.name.toUpperCase()}</p>
            //     </div>
            // </div>
            // <div className='flex justify-between'>
            //     <IconButton action={()=> onDelete(tag.id)} icon={faTrashAlt} classes='text-red' title='Delete' /> 
            //     <IconButton action={()=> setEditing(true)} icon={faPencilAlt} title='Edit' /> 
            // </div>

const DisplayCard = ({tag, setEditing, onDelete}) => {
    return (
        <div className='bg-white shadow-lg rounded-lg relative'>
            <div className='mt-2 '>
                <div className={`py-1 px-5 mx-2 rounded-full flex items-center justify-center border border-gray-borde`}>
                    <p className="text-black font-semibold text-2xs">{tag.name && tag.name.toUpperCase()}</p>
                </div>
                <p className='text-sm mx-2'>Description:</p>
                <p className='text-sm mx-2'>{tag.title}</p>
            </div>
            <div className='h-10' />
            <div className='absolute bottom-0 left-0 w-full'>
                <div className='flex justify-between'>
                    <IconButton action={()=> onDelete(tag.id)} icon={faTrashAlt} classes='text-red' title='Delete' /> 
                    <IconButton action={()=> setEditing(true)} icon={faPencilAlt} title='Edit' /> 
                </div>
            </div>
        </div>
    )
}

const EditCard = ({tag, setEditing, onUpdate, onDelete }) => {
    const [tagTitle, setTagTitle ] = useState(tag.title)
    const { register, handleSubmit, errors } = useForm()
    const cancelAction = tag.name ? <IconButton action={()=> setEditing(false)} icon={faBan} title='Cancel' />  :
                                     <IconButton action={()=> onDelete(tag.id)} icon={faTrashAlt} classes='text-red' title='Delete' /> 
    const classes = errors.name ? 'border border-red' : 'border-b border-gray-border'

    return (
        <div className='bg-white shadow-lg rounded-lg'>
            <form onSubmit={handleSubmit(onUpdate)} className='mx-2'>
                <div className='flex justify-between my-2'>
                    <div className='w-3/4 relative appearance-none label-floating'>
                        <input 
                            className={`w-full pt-1 px-3 leading-normal outline-none ${classes}`}
                            id='name'
                            data-cy='tag-name-input'
                            type='text'
                            name='name'
                            placeholder='Tag Name'
                            defaultValue={tag.name} ref={register({required: true})} 
                        />
                        { errors.name && <p className='text-red'>Name is required</p> }
                        <label className='absolute block text-green-darker top-0 left-0 w-full px-3 pt-1 leading-normal' htmlFor='name'>
                            Tag Name
                        </label>
                    </div>
                </div>
                <input className='' type='hidden' name="id" defaultValue={tag.id} ref={register} />
                <label className='' htmlFor='tag-title'>
                    Description:
                    <textarea name='tag-title' className='h-24 border border-gray-border w-full my-2' value={tagTitle} onChange={(e) => setTagTitle(e.target.value)} ref={register} />
                </label>
                <div className='flex justify-between'>
                    { cancelAction }
                    <input data-cy='tag-submit' className='m-2 px-2 border border-green rounded text-white bg-green text-xs font-bold' type="submit" value='Save'/>
                </div>
            </form>
        </div>
    )
}

const NewTag = ({tag, updateTag, onDelete})=> {
    const [editing, setEditing] = useState(!tag.name)
    const onUpdate = (data) => {
        updateTag(data)
        setEditing(false)
    }

    return editing ? <EditCard tag={tag} setEditing={setEditing} onUpdate={onUpdate} onDelete={onDelete} /> : 
                     <DisplayCard tag={tag} setEditing={setEditing} onDelete={onDelete} />

}

export default NewTag
