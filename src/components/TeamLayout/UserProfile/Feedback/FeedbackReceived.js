import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants'
import { useParams } from 'react-router-dom'
import NewTag from './NewTag'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight, faMinus, faAngleDoubleDown, faAngleDoubleUp, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import _ from 'lodash'

var randomColor = () => '#9AE6B4' //`#${Math.floor(Math.random()*16777215).toString(16)}`;

const feedback = [
    {
        uuid: uuidv4(),
        text: "Even more feedback. But making it a bit longer",
        from: { name: 'RS' },
        createdAt: '01/03/2020',
        tags: [
            {
                name: 'Glow',
                color: '#9AE6B4',
                id: 1,
            },
        ]
    },
    {
        uuid: uuidv4(),
        text: "The quick brown fox jumped over the lazy dog.",
        from: { name: 'AL' },
        createdAt: '01/02/2020',
        tags: [
            {
                name: 'Grow',
                color: '#FAF089',
                id: 2,
            },
        ]
    },
    {
        uuid: uuidv4(),
        text: "Last week, when you escalated your concerns over how our customer product owner was interacting with our team, you gave an example that was not actually about the customer product owner – it was something their senior architect had done. Eventually, we figured out who you were talking about, but the mix-up caused some confusion for me and made it harder to figure out how to improve the situation.",
        from: {
            name: 'AD'
        },
        createdAt: '01/01/2020',
        tags: [
            {
                name: 'Glow',
                color: '#9AE6B4',
                id: 1,
            },
            {
                name: 'Company Knowledge',
                color: randomColor(),
                id: 8,
            },
        ]
    }
]

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
const FeedbackTagGiven = ({tag}) => {
    return (
        <li style={{'backgroundColor': tag.color}} className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center`}>
            <p className="text-gray font-bold text-2xs">
                {tag.name.toUpperCase()}
            </p>
        </li>
    )
}


const availableTags = [
    {
        name: 'Company Knowledge',
        color: randomColor(),
        id: 8,
    },
    {
        name: 'Quanity of Work',
        color: randomColor(),
        id: 7,
    },
    {
        name: 'Quality of Work',
        color: randomColor(),
        id: 6,
    },
    {
        name: 'Attitude',
        color: randomColor(),
        id: 5,
    },
    {
        name: 'Team Player',
        color: randomColor(),
        id: 4,
    },
    {
        name: 'Trust',
        color: randomColor(),
        id: 3,
    },
    {
        name: 'Grow',
        color: '#FAF089',
        id: 2,
    },
    {
        name: 'Glow',
        color: '#9AE6B4',
        id: 1,
    },
]

const TagSelect = ({tags, setTags}) => {
    const toggleTag = (tag) => {
        const newTags = tags.includes(tag) ? tags.filter(selected => selected !== tag) : [...tags, tag]
        setTags(newTags)
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-4'>
            <h2 className='mx-2'>Tags</h2>
            <ul className='flex flex-wrap my-2'>
                { availableTags.map((tag) => <FeedbackTag key={tag.name} tag={tag} selected={tags.includes(tag)} select={toggleTag} />) }
            </ul>
        </div>
    )
}

const FeedbackTag = ({tag, selected, select}) => {
    const selectedStyle = selected ? '' : 'opacity-50'
    return (
        <li onClick={()=> select(tag)} style={{'backgroundColor': tag.color}} className={`cursor-pointer py-1 px-5 m-2 rounded-full flex items-center justify-center ${selectedStyle}`}>
            <p className="text-gray font-bold text-xs">
                {tag.name.toUpperCase()}
            </p>
        </li>
    )
}

const FeedbackReceived = ()=> {
    const { teamId, userId } = useParams()
    const [ open, setOpen ] = useState(true)
    const [ tags, setTags ] = useState([])

    const toggleFilters = () => setOpen(!open)
    const filterZone = open ? 'block' : 'hidden'
    const filterIcon = open ? faAngleDoubleDown : faAngleDoubleUp
    const filteredFeedback = feedback.filter(feedback => _.difference(tags.map(t=> t.id), feedback.tags.map(t=> t.id)).length === 0)

    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <Link className='flex items-center' to={`/team/${teamId}/users/${userId}`}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" />
                            <h1 className='ml-2'>User EO</h1>
                        </Link>
                        <h1>Parks and Rec</h1>
                    </div>
                </header>
                <div className='flex justify-between my-2'>
                    <h2 className='my-2'>Feedback Received</h2>
                    <button onClick={toggleFilters} className='flex items-center border border-gray-border rounded-lg px-4 py-2'>
                        <p className='mr-2'>Filters</p>
                        <FontAwesomeIcon icon={filterIcon} />
                    </button>
                </div>
                <div className={`${filterZone}`}>
                    <div className=''>
                        <TagSelect tags={tags} setTags ={setTags} />
                    </div>
                    <div className='border-b-2 border-gray-border my-4' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-gap-4 row-gap-4'>
                    {filteredFeedback.map((feedback) => <FeedbackCard key={feedback.uuid} feedback={feedback} />) }
                </div>
            </section>
        </main>
    )
}

export default FeedbackReceived