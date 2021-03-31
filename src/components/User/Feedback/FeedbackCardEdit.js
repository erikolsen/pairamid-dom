import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import TagGroups from './TagGroups'
import axios from 'axios'
import { API_URL } from '../../../constants'

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
};

const FeedbackCardEdit = ({setUpdatedFeedback, feedback, groups, setEditing, setUpdated}) => {
    const [ selectedTags, setSelectedTags ] = useState(feedback.tags)
    const tagCounts = selectedTags.map(tag => tag.name).reduce(getCount, {}) 

    const { register, handleSubmit, errors } = useForm()

    const onSave = (data, e) => {
        let payload = { ...data, tags: selectedTags.map(tag => tag.id) }
        setEditing(false)
        axios.post(`${API_URL}/feedbacks/${feedback.id}`, payload)
            .then((response) => {
                e.target.reset()
                setUpdatedFeedback(response.data)
                setUpdated(true)
            })
        setUpdated(false)
    }

    if(!feedback) return null
    return (
        <div className='col-span-1 bg-white shadow-lg rounded-lg'>
            <div className='relative h-full p-4'>
                <form className='' onSubmit={handleSubmit(onSave)}>
                    <div className=''>
                        <div className='grid grid-cols-2 gap-x-4 items-center my-4'>
                            <div className='col-span-2 md:col-span-1 flex items-center'>
                                <p className='text-sm font-bold'>From </p>
                                <input className={`border-b border-gray-border p-2 outline-none text-center text-sm`}
                                    id='authorName'
                                    type='text'
                                    name='authorName'
                                    placeholder='Anonymous'
                                    defaultValue={feedback.author_name}
                                    ref={register} 
                                />
                            </div>
                        </div>
                        { errors.message && <p className='text-red'>Please add a short message to your feedback. Thanks.</p> }
                        <p className='text-sm font-bold'>Message</p>
                        <textarea 
                            name='message' 
                            className='h-32 border border-gray-border w-full my-2' 
                            placeholder='Situation-Behavior-Impact...'
                            defaultValue={feedback.message}
                            ref={register({required: true})} 
                        />
                        <TagGroups groups={groups} tags={selectedTags} setTags={setSelectedTags} tagCounts={tagCounts} />
                        <div className='h-10'/>
                        <div className='absolute bottom-0 left-0 w-full'>
                            <div className={`grid grid-cols-2 gap-2`}>
                                <p onClick={()=>setEditing(false)} className='hover:bg-gray-border border border-gray-border py-2 col-span-1 cursor-pointer font-bold text-xs text-center' >
                                    Cancel
                                </p>
                                <input type='submit' value='Save' className='hover:bg-gray-border border border-gray-border py-2 col-span-1 cursor-pointer font-bold text-xs text-center' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FeedbackCardEdit
