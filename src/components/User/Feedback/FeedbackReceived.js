import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import RadarChartRecharts from '../../charts/RadarChart'
import SimpleScatterChart from '../../charts/BubbleChart'
import FeedbackCard from './FeedbackCard'
import TagGroups from './TagGroups'
import DateSelect from './DateSelect'
import { subMonths } from 'date-fns'
import ManageTags from './ManageTags'

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
};

const FeedbackReceived = (props)=> {
    const user = props.location.state.user
    console.log('user: ', user)
    const { userId } = useParams()
    const [ tags, setTags ] = useState([])

    const today = new Date()
    const [date, setDate] = useState([subMonths(today, 6), today])
    const [startDate, endDate] = date
    const dateFilter = (feedback) => new Date(feedback.created_at) >= startDate && new Date(feedback.created_at) <= endDate

    const [ openManageTags, setOpenManageTags ] = useState(false)
    const toggleManageTags = () => setOpenManageTags(!openManageTags)
    const manageTagsZone = openManageTags ? 'block' : 'hidden'
    const manageTagsIcon = openManageTags ? faAngleDoubleUp : faAngleDoubleDown


    const [ openFilters, setOpenFilters ] = useState(false)
    const toggleFilters = () => setOpenFilters(!openFilters)
    const filterZone = openFilters ? 'block' : 'hidden'
    const filterIcon = openFilters ? faAngleDoubleUp : faAngleDoubleDown

    const [ openCharts, setOpenCharts ] = useState(false)
    const toggleCharts = () => setOpenCharts(!openCharts)
    const chartZone = openCharts ? 'block' : 'hidden'
    const chartIcon = openCharts ? faAngleDoubleUp : faAngleDoubleDown

    const tagUnion = fb => _.difference(tags.map(t=> t.id), fb.tags.map(t=> t.id)).length === 0
    console.log('user.feedback: ', user.feedback)
    const filteredFeedback = user.feedback_received.filter(dateFilter).filter(tagUnion)
    console.log('filteredFeedback: ', filteredFeedback)

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
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <Link className='flex items-center' to={`/users/${userId}`}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" />
                            <h1 className='ml-2'>{user.full_name || user.username}</h1>
                        </Link>
                    </div>
                </header>

                <div className='flex justify-between my-2'>
                    <h2 className=''>Feedback Received</h2>
                    <div className='flex'>
                        <button onClick={toggleManageTags} className='flex items-center border border-gray-border rounded-lg px-4 py-2'>
                            <p className='mr-2 text-sm'>Manage Tags</p>
                            <FontAwesomeIcon icon={manageTagsIcon} size={'sm'} />
                        </button>
                        <button onClick={toggleFilters} className='mr-2 flex items-center border border-gray-border rounded-lg px-4 py-2'>
                            <p className='mr-2 text-sm'>Filters</p>
                            <FontAwesomeIcon icon={filterIcon} size={'sm'} />
                        </button>
                        <button onClick={toggleCharts} className='mr-2 flex items-center border border-gray-border rounded-lg px-4 py-2'>
                            <p className='mr-2 text-sm'>Charts</p>
                            <FontAwesomeIcon icon={chartIcon} size={'sm'} />
                        </button>
                    </div>
                </div>

                <div className={`${manageTagsZone} my-4`}>
                    <ManageTags feedback_tag_groups={user.feedback_tag_groups} />
                </div>

                <div className={`${filterZone} grid grid-cols-2 col-gap-4`}>
                    <div className='bg-white shadow-lg rounded-lg p-4'>
                        <h2 className='text-center my-2'>Filter by Tag</h2>
                        <TagGroups groups={user.feedback_tag_groups} tags={tags} setTags={setTags} tagCounts={tagCounts} />
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-4'>
                        <DateSelect date={date} setDate={setDate} />
                    </div>
                    <div className='col-span-2 border-b-2 border-gray-border my-4' />
                </div>

                <div className={`${chartZone}`}>
                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <h2 className='text-center pt-4'>Tag Radar</h2>
                        <RadarChartRecharts data={radarData} maxSize={maxSize} />
                    </div>

                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <h2 className='text-center pt-4'>Tags By Date</h2>
                        <SimpleScatterChart data={scatterData} />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-gap-4 row-gap-4'>
                    {filteredFeedback.map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} groups={user.feedback_tag_groups}/>) }
                </div>
            </section>
        </main>
    )
}

export default FeedbackReceived