import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { availableTags } from './testData'

const TagSelect = ({tags, setTags}) => {
    const toggleTag = (tag) => {
        const newTags = tags.includes(tag) ? tags.filter(selected => selected !== tag) : [...tags, tag]
        setTags(newTags)
    }

    return (
        <ul className='flex flex-wrap my-2'>
            { availableTags.map((tag) => <FeedbackTag key={tag.name} tag={tag} selected={tags.includes(tag)} select={toggleTag} />) }
        </ul>
    )
}

const FeedbackTag = ({tag, selected, select}) => {
    const selectedStyle = selected ? 'border-2 border-blue-700' : 'border border-gray-border hover:border-blue-700'
    const selectedText = selected ? 'text-blue-700' : 'text-gray-dark hover:text-blue-700'

    return (
        <li onClick={()=> select(tag)} className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle} my-1`}>
            <p className={`${selectedText} font-semibold text-2xs`}>
                { selected ? <span className='mr-2'><FontAwesomeIcon icon={faCheck} size='lg' /></span> : null }
                {tag.name.toUpperCase()}
            </p>
        </li>
    )
}

export default TagSelect
