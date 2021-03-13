import React, { useState, useEffect } from 'react'
import logo from '../../../assets/pairamid-logo.png';
import { Link, useRouteMatch } from "react-router-dom";
import Header from '../Header';
import axios from 'axios'
import { API_URL } from '../../../constants'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import TagGroups from './TagGroups'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
                    // <div className='w-full flex justify-center items-center'>
                    //     <div className='max-w-lg my-8 mx-4 p-6 bg-white border border-gray-border shadow-lg'>
                    //         <p className='text-lg'>{FbReq1.message} - {user.full_name || user.username}</p>
                    //     </div>
                    // </div>

const FbReq1 = {
    requesterUuid: '123',
    giverId: '456',
    feedbackRequestId: 'asdf92347',
    message: "I'm looking for glow/grows. If you can target them to my personal goals that would be great but I'll appriciate anything. Thanks!"
}
export const FeedbackRequest = () => {
    const { userId } = useParams()
    const [user, setUser] = useState()
    const [selectedTags, setSelectedTags] = useState([])
    const [feedbackText, setfeedbackText] = useState('Situation-Behavior-Impact...')
    const { register, handleSubmit, errors } = useForm()

    const [ openFilters, setOpenFilters] = useState(true)
    const toggleFilters = (e) => { e.preventDefault(); setOpenFilters(!openFilters) }
    const filterZone = openFilters ? 'block' : 'hidden'
    const filterIcon = openFilters ? faAngleDoubleUp : faAngleDoubleDown

    useEffect(()=> {
        axios.get(`${API_URL}/users/${userId}/feedback/new`).then((response)=> { setUser(response.data) })
    }, [userId])

    const onUpdate = (data) => {
        console.log('Submitting')
        console.log('data: ', {...data, ...{tags: selectedTags}})
        // axios.post(`${API_URL}/team`, data)
        //      .then((response) => {
        //          history.push(`/team/${response.data.uuid}/settings`)
        //      })
    }
    if (!user) { return null}
    console.log('user: ', user)
    return (
        <div className='bg-gray-light h-screen'>
            <header className="p-3 bg-white border-gray-border border-b-2">
                <div className='flex items-center justify-between'>
                    <Link className='w-full flex justify-center items-center' to='/'>
                        <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo" />
                    </Link>
                </div>
            </header>
            <main className="">
                <section className='w-full flex justify-center items-center my-8'>
                    <div className='max-w-3xl mx-4'>
                        <form className='bg-white shadow-lg rounded-lg rounded-b-none p-4 mx-2' onSubmit={handleSubmit(onUpdate)}>
                            <div className=''>
                                <div className='flex items-center justify-between'>
                                    <h2 className=''>Feedback for {user.full_name}</h2>
                                    <button onClick={toggleFilters} className='flex items-center border border-gray-border rounded-lg px-4 py-1'>
                                        <p className='mr-2 text-sm'>Tags</p>
                                        <FontAwesomeIcon icon={filterIcon} size="sm" />
                                    </button>
                                </div>
                                <div className='grid grid-cols-2 col-gap-4 items-center my-4'>
                                    <div className='col-span-2 md:col-span-1 flex items-center'>
                                        <p className=''>From </p>
                                        <input className={`border-b border-gray-border p-2 outline-none text-center text-sm`}
                                            id='name'
                                            type='text'
                                            name='giverName'
                                            placeholder='Anonymous'
                                            defaultValue={''}
                                            ref={register()} 
                                        />
                                    </div>
                                </div>
                                <div className={`py-4 ${filterZone}`}>
                                    <TagGroups groups={user.feedback_tag_groups} tags={selectedTags} setTags={setSelectedTags} tagCounts={{}} defaultExpand={true} />
                                </div>
                                <textarea 
                                    name='feedback-text' 
                                    className='h-48 border border-gray-border w-full my-2' 
                                    value={feedbackText} 
                                    onChange={(e) => setfeedbackText(e.target.value)} 
                                    ref={register} 
                                />
                                <input className='' type='hidden' name="receiverId" defaultValue={user.uuid} ref={register} />
                                <input type='submit' value='Submit' className='bg-green-icon w-full p-3 text-white font-bold' />
                            </div>
                            { errors.name && <p className='text-red'>Tag Name is required</p> }
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default FeedbackRequest
