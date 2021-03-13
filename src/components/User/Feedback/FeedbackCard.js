import React, {useState} from 'react'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight, faMinus, faPlus, faBan} from '@fortawesome/free-solid-svg-icons'
import TagGroups from './TagGroups'
import axios from 'axios'
import { API_URL } from '../../../constants'

const Faded = ({ children, duration, isOut }) => {
    const inEffect = `
      @keyframes react-fade-in {
        0%   { opacity: 0; }
        50%  { opacity: 0; }
        100% { opacity: 1; }
      }
    `;

    const outEffect = `
      @keyframes react-fade-out {
        0%   { opacity: 1; }
        50%  { opacity: 0; }
        100% { opacity: 0; }
      }
    `;

    return (
        <div>
            <style children={isOut ? outEffect : inEffect} />
            <div style={{
                animationDuration: `${duration}s`,
                animationIterationCount: 1,
                animationName: `react-fade-${(isOut ? 'out' : 'in')}`,
                animationTimingFunction: isOut ? 'ease-out' : 'ease-in',
                animationFillMode: 'forwards'
            }}
            >{children}</div>
        </div>
    )
}

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

const TagFooter = ({toggleFilters, onSave}) => {
    return (
        <div className={`flex justify-between items-center`}>
            <p onClick={toggleFilters} className={`cursor-pointer font-bold text-xs text-center`}>
                <FontAwesomeIcon icon={faBan} size='lg' />
            </p>

            <p onClick={onSave} className='cursor-pointer px-2 border border-green rounded text-white bg-green text-xs font-bold' >
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

    const [ updated, setUpdated ] = useState(false)
    const updatedNotification = updated ? 
        <Faded duration={10} isOut={true}><p className='ml-4 text-green font-bold'>Updated</p></Faded> : <div />
    const onSave = () => { 
        let payload = {tags: selectedTags.map(tag=> tag.id)}
        axios.post(`${API_URL}/feedbacks/${feedback.id}`, payload)
             .then((response) => {
                 setUpdated(true)
                 setOpenFilters(false)
             })
        setUpdated(false)
    }

    if(!feedback) return null
    return (
        <div className='col-span-1 bg-white shadow-lg rounded-lg p-4'>
            <div className='relative h-full'>
                <div className='flex justify-between'>
                    {updatedNotification}
                    <p className='mb-2 mr-4 text-sm'>{format(new Date(feedback.created_at), 'MM/dd/yyyy')}</p>
                </div>
                <div className='mx-4'>
                    <FontAwesomeIcon icon={faQuoteLeft} size='xs' /> 
                    <p className='text-sm mx-4'>{feedback.message}</p>
                    <span className='flex justify-end items-center'>
                        <FontAwesomeIcon icon={faQuoteRight} size='xs' />
                        <FontAwesomeIcon className='mx-2' icon={faMinus} size='xs' />
                        <span className='font-bold text-sm'>{feedback.author_name}</span>
                    </span>
                </div>
                <div className='mx-8 mt-1'>
                    <ul className='flex flex-wrap'>
                        { selectedTags.map((tag) => <FeedbackTagGiven key={tag.id} tag={tag} />)}
                    </ul>
                </div>
                <div className={`${filterZone} m-4`}>
                    <TagGroups groups={groups} tags={selectedTags} setTags={setSelectedTags} tagCounts={tagCounts} />
                </div>
                <div className='h-10'/>
                <div className='absolute bottom-0 left-0 w-full px-4'>
                    <div className='border-b-2 border-gray-border mb-2' />
                    {openFilters ? <TagFooter toggleFilters={toggleFilters} onSave={onSave} /> : <AddTags toggleFilters={toggleFilters} />}
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard
