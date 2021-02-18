import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import TagSelect from './TagSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

export const CreateFeedback = ({username}) => {
    const { teamId } = useParams()
    const [selected, setSelected] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [team, setTeam] = useState({name: '', users: [], roles: []})
    const [feedbackText, setfeedbackText] = useState('Situation-Behavior-Impact...')
    const { register, handleSubmit, errors } = useForm()
    const history = useHistory()

    const [ openFilters, setOpenFilters] = useState(false)
    const toggleFilters = () => setOpenFilters(!openFilters)
    const filterZone = openFilters ? 'block' : 'hidden'
    const filterIcon = openFilters ? faAngleDoubleUp : faAngleDoubleDown

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
                        <button onClick={toggleFilters} className='flex items-center border border-gray-border rounded-lg px-4 py-1'>
                            <p className='mr-2 text-sm'>Tags</p>
                            <FontAwesomeIcon icon={filterIcon} size="sm" />
                        </button>
                    </div>
                    <div className={`${filterZone}`}>
                        <TagSelect tags={selectedTags} setTags={setSelectedTags} />
                    </div>
                    <textarea name='feedback-text' className='h-48 border border-gray-border w-full my-2' value={feedbackText} onChange={(e) => setfeedbackText(e.target.value)} ref={register} />
                    <input type='submit' value={submitText} className='bg-green-icon w-full p-3 text-white font-bold' />
                </div>
                { errors.name && <p className='text-red'>Tag Name is required</p> }
            </form>
        </div>
    )
}

export default CreateFeedback
