import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import _ from 'lodash'
import RadarChartRecharts from '../../charts/RadarChart'
import SimpleScatterChart from '../../charts/BubbleChart'
import FeedbackCard from './FeedbackCard'
import TagGroups from './TagGroups'
import DateSelect from './DateSelect'
import { subMonths, addDays } from 'date-fns'
import ManageTags from './ManageTags'
import axios from 'axios'
import { API_URL } from '../../../constants'

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
        return { 'Authorization': `Bearer ${currentUser.access_token}` };
    } else {
        return {};
    }
}

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
};

const useToggleZone = (name, initialOpen=false) => {
    const [ open, setOpen ] = useState(initialOpen)
    const toggleOpen = () => setOpen(!open)
    const toggleZone = open ? 'block' : 'hidden'
    const toggleButtonClasses = open ? 'bg-blue-700 text-white' : 'hover:border-2 hover:border-blue-700'
    const ToggleButton = ({className}) => {
        return (
            <button onClick={toggleOpen} className={`ml-2 flex items-center border border-gray-border rounded-lg px-4 py-2 focus:outline-none ${toggleButtonClasses} ${className}`}>
                <p className='text-sm'>{name}</p>
            </button>
        )
    }
    const ToggleZone = ({children, className}) => {
        return (
            <div className={`${toggleZone} ${className}`}>
                {children}
            </div>
        )
    }
    return [ToggleButton, ToggleZone]
}

const FeedbackReceived = ()=> {
    const { userId } = useParams()
    const history = useHistory()
    const [user, setUser] = useState()
    const [ManageTagsButton, ManageTagsZone] = useToggleZone('Manage Tags', true)
    const [FilterButton, FilterZone] = useToggleZone('Filters')
    const [ChartsButton, ChartsZone] = useToggleZone('Charts')

    useEffect(()=> {
        axios.get(`${API_URL}/users/${userId}`, {headers: authHeader()})
            .then((response)=> {
                setUser(response.data)
            })
            .catch((error)=> {
                console.log('error: ', error)
                history.push('/login')
            })
    }, [setUser, userId, history])

    const [ tags, setTags ] = useState([])

    const today = new Date()
    const [date, setDate] = useState([subMonths(today, 1), addDays(today, 1)])
    const [startDate, endDate] = date
    const dateFilter = (feedback) => new Date(feedback.created_at) >= startDate && new Date(feedback.created_at) <= endDate

    if (!user) { return null }

    const tagUnion = fb => _.difference(tags.map(t=> t.id), fb.tags.map(t=> t.id)).length === 0
    const filteredFeedback = user.feedback_received.filter(dateFilter).filter(tagUnion)

    const tagCounts = filteredFeedback.flatMap(feedback => feedback.tags.map(tag => tag.name)).reduce(getCount, {}) 

    const maxSize = Math.max(...Object.values(tagCounts))
    const radarData = Object.entries(tagCounts).map(([name, value]) => ({
        tag: name,
        tagCount: value,
        fullMark: maxSize,
    }))

    const JOINER = '<->'
    const scatterFeedback = filteredFeedback.flatMap(feedback => feedback.tags.map(tag => `${tag.name}${JOINER}${feedback.created_at}`)).reduce(getCount, {}) 
    const scatterData = Object.entries(scatterFeedback).map(([key, value]) => ({
        name: key.split(JOINER)[0],
        date: key.split(JOINER)[1],
        z: value,
    }))

    return (
        <main className="bg-gray-light col-span-7 h-full">
            <section>
                <div className='md:flex md:justify-between md:items-center'>
                    <h2 className='my-2'>Feedback</h2>
                    <div className='flex my-2'>
                        <ManageTagsButton />
                        <FilterButton />
                        <ChartsButton />
                    </div>
                </div>

                <ManageTagsZone className='my-4'>
                    <ManageTags user={user} feedback_tag_groups={user.feedback_tag_groups} />
                </ManageTagsZone>

                <FilterZone className='grid grid-cols-2 gap-x-4 gap-y-4'>
                    <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-4'>
                        <h2 className='text-center my-2'>Filter by Tag</h2>
                        <TagGroups groups={user.feedback_tag_groups} tags={tags} setTags={setTags} tagCounts={tagCounts} />
                    </div>
                    <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-4'>
                        <DateSelect date={date} setDate={setDate} />
                    </div>
                    <div className='col-span-2 border-b-2 border-gray-border my-4' />
                </FilterZone>

                <ChartsZone>
                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <h2 className='text-center pt-4'>Tag Radar</h2>
                        <RadarChartRecharts data={radarData} maxSize={maxSize} />
                    </div>

                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <h2 className='text-center pt-4'>Tags By Date</h2>
                        <SimpleScatterChart data={scatterData} />
                    </div>
                </ChartsZone>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4'>
                    {filteredFeedback.map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} groups={user.feedback_tag_groups}/>) }
                </div>
            </section>
        </main>
    )
}

export default FeedbackReceived