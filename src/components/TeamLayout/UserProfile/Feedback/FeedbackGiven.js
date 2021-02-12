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

const FeedbackCard = () => {
    return (
        <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-4'>
            <p className='text-right mb-2 text-sm'>{format(new Date(), 'MM/dd/yyyy')}</p>
            <div className='mx-6'>
                <FontAwesomeIcon icon={faQuoteLeft} size='xs' /> 
                <p className='text-sm mx-6'>
                    Last week, when you escalated your concerns over how our customer product owner was interacting with our team, 
                    you gave an example that was not actually about the customer product owner – it was something their senior architect 
                    had done. Eventually, we figured out who you were talking about, but the mix-up caused some confusion for me and made it 
                    harder to figure out how to improve the situation.</p>
                <span className='flex justify-end items-center'>
                    <FontAwesomeIcon icon={faQuoteRight} size='xs' />
                    <FontAwesomeIcon className='mx-2' icon={faMinus} size='xs' />
                    <span className='font-bold text-sm'>AD</span>
                </span>
            </div>
            <div className='mx-12 my-6'>
                <ul className='flex flex-wrap'>
                    <li className={`bg-green-300 py-1 px-5 mr-2 rounded-full flex items-center justify-center`}>
                        <p className="font-bold text-2xs">GROW</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}


const availableTags = [
    {
        name: 'Glow',
        color: '#9AE6B4',
        id: 1,
    },
    {
        name: 'Grow',
        color: '#FAF089',
        id: 2,
    }
]

const FeedbackTag = ({tag, selected, select}) => {
    const selectedStyle = selected ? '' : 'opacity-50'
    return (
        <li onClick={()=> select(tag)} style={{'backgroundColor': tag.color}} className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle}`}>
            <p className="text-gray font-bold text-xs">
                {tag.name.toUpperCase()}
            </p>
        </li>
    )
}

const CreateFeedback = ({username}) => {
    const { teamId } = useParams()
    const [selected, setSelected] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [team, setTeam] = useState({name: '', users: [], roles: []})
    const [feedbackText, setfeedbackText] = useState('Situation-Behavior-Impact...')
    const { register, handleSubmit, errors } = useForm()
    const history = useHistory()

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}`).then((response)=> { setTeam(response.data) })
    }, [teamId])

    const onUpdate = (data) => {
        console.log('Submitting')
        // axios.post(`${API_URL}/team`, data)
        //      .then((response) => {
        //          history.push(`/team/${response.data.uuid}/settings`)
        //      })
    }
    const submitText = selected ? `Share Feedback with ${selected.toUpperCase()}` : 'Share Feedback'
    const errorClass = errors.name ? 'border border-red' : 'border-b border-gray-border' 

    const toggleTag = (tag) => {
        const newTags = selectedTags.includes(tag) ? selectedTags.filter(selected => selected !== tag) : [...selectedTags, tag]
        setSelectedTags(newTags)
    }

    return (
        <div className=''>
            <form className='bg-white shadow-lg rounded-lg rounded-b-none p-4' onSubmit={handleSubmit(onUpdate)}>
                <div className=''>
                    <h2 className='text-center'>Share Feedback</h2>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <p className='text-center'>Feedback for </p>
                            <div className='relative appearance-none label-floating my-4'>
                                <select 
                                    onChange={(e) => setSelected(e.target.value)} 
                                    name='userId' 
                                    value={selected} 
                                    ref={register} 
                                    className="outline-none block appearance-none border-b border-gray-border w-full bg-white pl-2 py-2 pr-8 rounded leading-tight"
                                >
                                    <option value=''>Select a User</option>
                                    { team.users.map((user) => <option key={user.id} className='' value={user.username}>{user.username}</option> ) }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className='flex my-2'>
                        { availableTags.map((tag) => <FeedbackTag key={tag.name} tag={tag} selected={selectedTags.includes(tag)} select={toggleTag} />) }
                    </ul>
                    <textarea name='feedback-text' className='h-32 border border-gray-border w-full my-2' value={feedbackText} onChange={(e) => setfeedbackText(e.target.value)} ref={register} />
                    <input type='submit' value={submitText} className='bg-green-icon w-full p-3 text-white font-bold' />
                </div>
                { errors.name && <p className='text-red'>Tag Name is required</p> }
            </form>
            <div className='rounded-full rounded-t-none'>
                <ManageTags />
            </div>
        </div>
    )
}

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
            <div onClick={toggleExpanded} className='cursor-pointer flex justify-between items-center bg-white shadow-lg rounded-lg px-4 pb-4 rounded-t-none'>
                <h2 className='text-center text-sm'>Manage Feedback Tags</h2>
                <FontAwesomeIcon icon={expanded ? faAngleDoubleUp : faAngleDoubleDown} size='1x' />
            </div>
            <div className={`bg-gray-light ${showSection}`}>
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

const FeedbackGiven = ()=> {
    const { teamId, userId } = useParams()

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
                <CreateFeedback />
                <div className='border-b-2 border-gray-border my-4' />
                <h2 className='my-2'>Feedback Given</h2>
                <div className='grid grid-cols-3 col-gap-4 row-gap-4'>
                    <FeedbackCard />
                    <FeedbackCard />
                    <FeedbackCard />
                    <FeedbackCard />
                    <FeedbackCard />
                    <FeedbackCard />
                </div>
            </section>
        </main>
    )
}

export default FeedbackGiven