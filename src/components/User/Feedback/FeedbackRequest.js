import React, { useState, useEffect } from 'react'
import Header from '../Header';
import axios from 'axios'
import { API_URL } from '../../../constants'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import TagGroups from './TagGroups'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { testGroups } from '../../../localTestData'

const FbReq1 = {
    requesterUuid: '123',
    giverId: '456',
    feedbackRequestId: 'asdf92347',
    message: "I'm looking for glow/grows. If you can target them to my personal goals that would be great but I'll appriciate anything. Thanks!"
}
export const FeedbackRequest = ({requestId}) => {
    // const { teamId } = useParams()
    const user = {full_name: 'Erik Olsen', username: 'EO', id: '123'}
    const [selected, setSelected] = useState('')
    const [receiverId, setReceiverId] = useState(user.full_name)
    const [selectedTags, setSelectedTags] = useState([])
    const [team, setTeam] = useState({name: '', users: [user], roles: []})
    const [feedbackText, setfeedbackText] = useState('Situation-Behavior-Impact...')
    const { register, handleSubmit, errors } = useForm()

    const [ openFilters, setOpenFilters] = useState(true)
    const toggleFilters = (e) => { e.preventDefault(); setOpenFilters(!openFilters) }
    const filterZone = openFilters ? 'block' : 'hidden'
    const filterIcon = openFilters ? faAngleDoubleUp : faAngleDoubleDown

    // useEffect(()=> {
    //     axios.get(`${API_URL}/team/${teamId}`).then((response)=> { setTeam(response.data) })
    // }, [teamId])

    const onUpdate = (data) => {
        console.log('Submitting')
        // axios.post(`${API_URL}/team`, data)
        //      .then((response) => {
        //          history.push(`/team/${response.data.uuid}/settings`)
        //      })
    }
    const submitText = selected ? `Share Feedback with ${selected.toUpperCase()}` : 'Share Feedback'
    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
                <section>
                    <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                        <div className='w-full flex justify-center items-center'>
                            <h1>Feedback request from {user.full_name}</h1>
                        </div>
                    </header>
                    <div className='mx-2 md:mx-48 my-6 p-6 bg-white border border-gray-border shadow-lg'>
                        <p className='text-lg'>{FbReq1.message} - {user.full_name || user.username}</p>
                    </div>
                    <form className='bg-white shadow-lg rounded-lg rounded-b-none p-4 mx-2' onSubmit={handleSubmit(onUpdate)}>
                        <div className=''>
                            <div className='flex items-center justify-between'>
                                <h2 className=''>Share Feedback</h2>
                                <button onClick={toggleFilters} className='flex items-center border border-gray-border rounded-lg px-4 py-1'>
                                    <p className='mr-2 text-sm'>Tags</p>
                                    <FontAwesomeIcon icon={filterIcon} size="sm" />
                                </button>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <p className='text-center'>Feedback for </p>
                                    <div className='relative appearance-none label-floating my-4'>
                                        <select 
                                            onChange={(e) => setReceiverId(e.target.value)} 
                                            name='receiverId' 
                                            value={receiverId} 
                                            ref={register} 
                                            className="outline-none block appearance-none border-b border-gray-border w-full bg-white pl-2 py-2 pr-8 rounded leading-tight"
                                        >
                                            <option value=''>Select a User</option>
                                            { team.users.map((user) => <option key={user.id} className='' value={user.full_name}>{user.full_name}</option> ) }
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center'>
                                    <p className='text-center'>Feedback from </p>
                                    <div className='relative appearance-none label-floating my-4'>
                                        <select 
                                            onChange={(e) => setSelected(e.target.value)} 
                                            name='giverId' 
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
                            <div className={`${filterZone}`}>
                                <TagGroups groups={testGroups} tags={selectedTags} setTags={setSelectedTags} tagCounts={{}} defaultExpand={true} />
                            </div>
                            <textarea name='feedback-text' className='h-48 border border-gray-border w-full my-2' value={feedbackText} onChange={(e) => setfeedbackText(e.target.value)} ref={register} />
                            <input type='submit' value={submitText} className='bg-green-icon w-full p-3 text-white font-bold' />
                        </div>
                        { errors.name && <p className='text-red'>Tag Name is required</p> }
                    </form>
                </section>
            </main>
        </div>
    )
}

export default FeedbackRequest
