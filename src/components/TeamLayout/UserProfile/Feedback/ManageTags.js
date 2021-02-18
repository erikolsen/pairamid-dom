import React, { useState } from 'react'
import NewTag from './NewTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { availableTags } from './testData'

const ManageTags = ()=> {
    const emptyTag = {
        name: '',
        color: '#9AE6B4',
        id: uuidv4()
    }
    const [expanded, setExpanded] = useState(false)
    const [tags, setTags] = useState(availableTags)
    const toggleExpanded = () => setExpanded(!expanded)

    const addTag = () => setTags([...tags, emptyTag])
    const updateTag = (newTag) => setTags(tags.map(oldTag => (oldTag.id === newTag.id ? newTag : oldTag)))
    const removeTag = (id) => setTags(tags.filter((oldTag) => oldTag.id !== id))

    const showSection = expanded ? 'block' : 'hidden'

    return (
        <div className=''>
            <div onClick={toggleExpanded} className='cursor-pointer flex justify-between items-center bg-white shadow-lg rounded-lg rounded-t-none p-4'>
                <p className='text-center font-bold'>Manage Feedback Tags</p>
                <FontAwesomeIcon icon={expanded ? faAngleDoubleUp : faAngleDoubleDown} size='1x' />
            </div>
            <div className={`bg-gray-light shadow-none ${showSection}`}>
                <div className='grid grid-cols-2 lg:grid-cols-3 col-gap-2 row-gap-2 my-2'>
                    {tags.map(tag => <NewTag key={tag.id} tag={tag} updateTag={updateTag} onDelete={removeTag} />) }
                </div>
                <button onClick={addTag} className='mx-2 flex items-center'>
                    <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                    <span className='mx-2 text-gray'>Add Tag</span>
                </button>
            </div>
        </div>

    )
}

export default ManageTags