import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import RadarChartRecharts from '../../../charts/RadarChart'
import SimpleScatterChart from '../../../charts/BubbleChart'
import { feedback, testGroups } from './testData'
import FeedbackCard from './FeedbackCard'
import TagGroups from './TagGroups'
import Calendar from 'react-calendar'
import { subYears } from 'date-fns'

const localDate = date => date ? date.toLocaleDateString('en-US') : ''
const spanOfDays = (d1, d2) => (localDate(d1) !== localDate(d2))

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
  };


const FeedbackReceived = ()=> {
    const { teamId, userId } = useParams()
    const [ openFilters, setOpenFilters ] = useState(false)
    const [ openCharts, setOpenCharts ] = useState(false)
    const [ tags, setTags ] = useState([])

    const today = new Date()
    const [date, setDate] = useState([subYears(today, 1), today])
    const [rangeSelect, setRangeSelect] = useState(false)
    const [startDate, endDate] = date
    const dateFilter = (feedback) => new Date(feedback.createdAt) >= startDate && new Date(feedback.createdAt) <= endDate

    const tagUnion = feedback => _.difference(tags.map(t=> t.id), feedback.tags.map(t=> t.id)).length === 0

    const toggleFilters = () => setOpenFilters(!openFilters)
    const toggleCharts = () => setOpenCharts(!openCharts)
    const filterZone = openFilters ? 'block' : 'hidden'
    const filterIcon = openFilters ? faAngleDoubleUp : faAngleDoubleDown

    const chartZone = openCharts ? 'block' : 'hidden'
    const chartIcon = openCharts ? faAngleDoubleUp : faAngleDoubleDown

    console.log('Feedback', feedback)
    const filteredFeedback = feedback.filter(dateFilter).filter(tagUnion)

    const tagCounts = filteredFeedback.flatMap(feedback => feedback.tags.map(tag => tag.name)).reduce(getCount, {}) 

    const maxSize = Math.max(...Object.values(tagCounts))
    const radarData = Object.entries(tagCounts).map(([name, value]) => ({
        tag: name,
        tagCount: value,
        fullMark: maxSize,
    }))

    const JOINER = '<->'
    const scatterFeedback = filteredFeedback.flatMap(feedback => feedback.tags.map(tag => `${tag.name}${JOINER}${feedback.createdAt}`)).reduce(getCount, {}) 
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
                        <Link className='flex items-center' to={`/team/${teamId}/users/${userId}`}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" />
                            <h1 className='ml-2'>User EO</h1>
                        </Link>
                        <h1>Mighty Ducks</h1>
                    </div>
                </header>

                <div className='flex justify-between my-2'>
                    <h2 className='my-2'>Feedback Received</h2>
                    <div className='flex'>
                        <button onClick={toggleFilters} className='flex items-center border border-gray-border rounded-lg px-4 py-2'>
                            <p className='mr-2'>Filters</p>
                            <FontAwesomeIcon icon={filterIcon} />
                        </button>
                        <button onClick={toggleCharts} className='ml-2 flex items-center border border-gray-border rounded-lg px-4 py-2'>
                            <p className='mr-2'>Charts</p>
                            <FontAwesomeIcon icon={chartIcon} />
                        </button>
                    </div>
                </div>

                <div className={`${filterZone} grid grid-cols-2 col-gap-2`}>
                    <div className='bg-white shadow-lg rounded-lg p-4'>
                        <h2 className='text-center my-2'>Filter by Tag</h2>
                        <TagGroups groups={testGroups} tags={tags} setTags={setTags} tagCounts={tagCounts} />
                    </div>
                    <div className='bg-white shadow-lg rounded-lg p-4'>
                        <p className='flex justify-center items-center font-bold text-center text-lg my-2'>
                            Filtering Dates <span className='ml-2'>{localDate(startDate)}</span>
                            {spanOfDays(startDate, endDate) && <span>-{localDate(endDate)}</span>}
                        </p>
                        <div className='flex justify-center'>
                            <Calendar 
                                className='p-2'
                                calendarType='US'
                                onChange={(e)=> setDate(e)} 
                                selectRange={rangeSelect}
                                returnValue='range'
                                value={date}
                            />
                        </div>
                        <label className="flex mt-4">
                            <div className="bg-white border-2 rounded border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                                <input onClick={()=> setRangeSelect(!rangeSelect)} type="checkbox" className="opacity-0 absolute" name='repeatWeekly' />
                                <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                            </div>
                            <div className="select-none">Select Range</div>
                        </label>
                        { rangeSelect && <p className='text-center my-4'>First click will select start date. Second click will select end date. Third click will set a new start date.</p> }
                    </div>
                    <div className='border-b-2 border-gray-border my-4' />
                </div>

                <div className={`${chartZone}`}>
                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <RadarChartRecharts data={radarData} maxSize={maxSize} />
                    </div>

                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <SimpleScatterChart data={scatterData} />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-gap-4 row-gap-4'>
                    {filteredFeedback.map((feedback) => <FeedbackCard key={feedback.uuid} feedback={feedback} />) }
                </div>
            </section>
        </main>
    )
}

export default FeedbackReceived