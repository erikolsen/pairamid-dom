import React, { useState } from 'react'
import NewTag from './NewTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid';
import { testGroups } from './testData'
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { faPlus, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({action, icon, classes, title}) => {
    const onClick = (e) => { e.preventDefault(); action() }

    return (
        <button data-cy={title} className={`focus:outline-none my-2 mx-4 ${classes}`} onClick={onClick} title={title}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

const EditGroup = ({group, setEditing, onUpdate, onDelete }) => {
    const { register, handleSubmit, errors } = useForm()
    const cancelAction = group.name ? <IconButton action={()=> setEditing(false)} icon={faBan} title='Cancel' />  :
                                     <IconButton action={()=> onDelete(group.id)} icon={faTrashAlt} classes='text-red' title='Delete' /> 
    const classes = errors.name ? 'border border-red' : 'border-b border-gray-border'

    return (
        <div className='bg-white shadow-lg rounded-lg my-2'>
            <form onSubmit={handleSubmit(onUpdate)}>
                <div className='flex justify-between'>
                    <div className='w-3/4 px-3 relative appearance-none label-floating'>
                        <input 
                            className={`w-full pt-1 leading-normal outline-none ${classes}`}
                            id='name'
                            type='text'
                            name='name'
                            placeholder='Group Name'
                            defaultValue={group.name} ref={register({required: true})} 
                            autoFocus
                        />
                        { errors.name && <p className='text-red'>Name is required</p> }
                        <label className='absolute block text-green-darker top-0 left-0 w-full pt-1 px-3 leading-normal' htmlFor='name'>
                            Group Name
                        </label>
                    </div>
                </div>
                <input className='' type='hidden' name="id" defaultValue={group.id} ref={register} />
                <div className='flex justify-between'>
                    { cancelAction }
                    <input className='m-2 px-2 border border-green rounded text-white bg-green text-xs font-bold' type="submit" value='Save'/>
                </div>
            </form>
        </div>
    )
}

const TagGroup = ({addTag, updateTag, removeTag, group}) => {
    const [ open, setOpen ] = useState(false)
    const toggle = () => setOpen(!open)
    const collpaseIcon = open ? faMinusSquare : faPlusSquare
    const groupZone = open ? 'block' : 'hidden'

    return (
        <div>
            <div className='flex items-center bg-white px-4 py-2'>
                <p className='mr-2'>{group.name}</p>
                <div onClick={toggle}><FontAwesomeIcon icon={collpaseIcon} size='xs' /></div>
            </div>
            <div className={`${groupZone}`}>
                <div className='grid grid-cols-2 lg:grid-cols-3 col-gap-2 row-gap-2 my-2'>
                    {group.tags.map(tag => <NewTag key={tag.id} tag={tag} updateTag={updateTag} onDelete={removeTag} />) }
                </div>
                <button onClick={addTag} className='mx-2 flex items-center'>
                    <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                    <span className='mx-2 text-gray'>Add Tag</span>
                </button>
            </div>
        </div>
    )
}

const ManageTags = ()=> {
    const emptyGroup = {
        name: '',
        tags: [],
        id: uuidv4()
    }

    const emptyTag = {
        name: '',
        color: '#9AE6B4',
        id: uuidv4()
    }

    const [groups, setGroups] = useState(testGroups)

    const addGroup = () => setGroups([...groups, emptyGroup])
    const updateGroup = (newGroup) => setGroups(groups.map(oldGroup => (oldGroup.id === newGroup.id ? {...newGroup, tags: []} : oldGroup)))
    const removeGroup = (id) => setGroups(groups.filter((oldGroup) => oldGroup.id !== id))

    const addTag = (group) => () => setGroups(
        groups.map(
            oldGroup => (oldGroup.id === group.id ? { ...group, tags: [...group.tags, emptyTag] } : oldGroup)
        )
    )

    const updateTag = (group) => (newTag) => setGroups(
        groups.map(
            oldGroup => (oldGroup.id === group.id ? { ...group, tags: group.tags.map(oldTag => (oldTag.id === newTag.id ? newTag : oldTag))} : oldGroup)
        )
    )

    const removeTag = (group) => (id) => setGroups(
        groups.map(
            oldGroup => (oldGroup.id === group.id ? { ...group, tags: group.tags.filter((oldTag) => oldTag.id !== id)} : oldGroup)
        )
    )

    return (
        <div className=''>
            <div className=''>
                <div className='flex items-center justify-between bg-white shadow-lg rounded-lg rounded-b-none'>
                    <p className='p-4 font-bold text-lg'>Manage Feedback Tags/Groups</p>
                    <button onClick={addGroup} className='flex items-center border border-gray-border rounded-lg px-4 py-1 mx-4'>
                        <p className='mr-2 text-sm'>Add Group</p>
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                </div>
                <div className={``}>
                    { groups.filter(group => !group.name).map(group => <EditGroup key={group.id} group={group} onUpdate={updateGroup} onDelete={removeGroup} />) }
                </div>
                <div className={``}>
                    { groups.filter(group => group.name).map(group => <TagGroup key={group.id} group={group} addTag={addTag(group)} updateTag={updateTag(group)} removeTag={removeTag(group)} />) }
                </div>
                <div className='bg-white shadow-lg rounded-lg rounded-t-none p-1' />
            </div>
        </div>
    )
}

export default ManageTags
