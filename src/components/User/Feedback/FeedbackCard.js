import React, {useState} from 'react'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight, faMinus, faPlus, faBan} from '@fortawesome/free-solid-svg-icons'
import TagGroups from './TagGroups'

const FeedbackTagGiven = ({tag}) => {
    const selectedStyle = 'border border-gray-dark'
    const selectedText = 'text-gray-dark'
    return (
        <li title={tag.description} className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle} my-1`}>
            <p className={`${selectedText} font-bold text-2xs`}>
                {tag.name.toUpperCase()}
            </p>
        </li>
    )
}

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
};

const AddTags = ({toggleFilters}) => {
    return (
        <p onClick={toggleFilters} className={`cursor-pointer w-full font-bold text-xs text-center`}>
            Add Tags
            <FontAwesomeIcon className='mx-2' icon={faPlus} />
        </p>
    )
}

const TagFooter = ({toggleFilters}) => {
    return (
        <div className={`flex justify-between items-center`}>
            <p onClick={toggleFilters} className={`cursor-pointer font-bold text-xs text-center`}>
                <FontAwesomeIcon icon={faBan} size='lg' />
            </p>

            <p onClick={toggleFilters} className='cursor-pointer px-2 border border-green rounded text-white bg-green text-xs font-bold' >
                Save
            </p>
        </div>
    )
}

const FeedbackCard = ({feedback, groups}) => {
    const [ selectedTags, setSelectedTags ] = useState(feedback.tags)
    const tagCounts = selectedTags.map(tag => tag.name).reduce(getCount, {}) 

    const [ openFilters, setOpenFilters] = useState(false)
    const toggleFilters = () => setOpenFilters(!openFilters)
    const filterZone = openFilters ? 'block' : 'hidden'
    if(!feedback) return null
    return (
        <div className='col-span-1 bg-white shadow-lg rounded-lg p-4'>
            <div className='relative h-full'>
                <p className='text-right mb-2 mr-4 text-sm'>{format(new Date(feedback.created_at), 'MM/dd/yyyy')}</p>
                <div className='mx-4'>
                    <FontAwesomeIcon icon={faQuoteLeft} size='xs' /> 
                    <p className='text-sm mx-4'>{feedback.message}</p>
                    <span className='flex justify-end items-center'>
                        <FontAwesomeIcon icon={faQuoteRight} size='xs' />
                        <FontAwesomeIcon className='mx-2' icon={faMinus} size='xs' />
                        <span className='font-bold text-sm'>{feedback.sender_name}</span>
                    </span>
                </div>
                <div className='mx-8 mt-1'>
                    <ul className='flex flex-wrap'>
                        { selectedTags.map((tag) => <FeedbackTagGiven key={tag.name} tag={tag} />)}
                    </ul>
                </div>
                <div className={`${filterZone} m-4`}>
                    <TagGroups groups={groups} tags={selectedTags} setTags={setSelectedTags} tagCounts={tagCounts} />
                </div>
                <div className='h-10'/>
                <div className='absolute bottom-0 left-0 w-full px-4'>
                    <div className='border-b-2 border-gray-border mb-2' />
                    {openFilters ? <TagFooter toggleFilters={toggleFilters} /> : <AddTags toggleFilters={toggleFilters} />}
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard
