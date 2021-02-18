import React from 'react'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight, faMinus } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

const FeedbackTagGiven = ({tag}) => {
    const selectedStyle = 'border border-gray-dark'
    const selectedText = 'text-gray-dark'
    return (
        <li className={`py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle} my-1`}>
            <p className={`${selectedText} font-bold text-2xs`}>
                {tag.name.toUpperCase()}
            </p>
        </li>
    )
}

const FeedbackCard = ({feedback}) => {
    if(!feedback) return null
    return (
        <div className='col-span-1 bg-white shadow-lg rounded-lg p-4'>
            <p className='text-right mb-2 mr-4 text-sm'>{format(new Date(feedback.createdAt), 'MM/dd/yyyy')}</p>
            <div className='mx-4'>
                <FontAwesomeIcon icon={faQuoteLeft} size='xs' /> 
                <p className='text-sm mx-4'>{feedback.text}</p>
                <span className='flex justify-end items-center'>
                    <FontAwesomeIcon icon={faQuoteRight} size='xs' />
                    <FontAwesomeIcon className='mx-2' icon={faMinus} size='xs' />
                    <span className='font-bold text-sm'>{feedback.from.name}</span>
                </span>
            </div>
            <div className='mx-8 mt-1'>
                <ul className='flex flex-wrap'>
                    { feedback.tags.map((tag) => <FeedbackTagGiven key={tag.name} tag={tag} />)}
                </ul>
            </div>
        </div>
    )
}

export default FeedbackCard