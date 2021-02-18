import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import RadarChartRecharts from '../../../charts/RadarChart'
import SimpleScatterChart from '../../../charts/BubbleChart'
import { feedback } from './testData'
import FeedbackCard from './FeedbackCard'
import TagSelect from './TagSelect'

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
  };

const FeedbackReceived = ()=> {
    const { teamId, userId } = useParams()
    const [ openFilters, setOpenFilters ] = useState(false)
    const [ openCharts, setOpenCharts ] = useState(false)
    const [ tags, setTags ] = useState([])

    const toggleFilters = () => setOpenFilters(!openFilters)
    const toggleCharts = () => setOpenCharts(!openCharts)
    const filterZone = openFilters ? 'block' : 'hidden'
    const filterIcon = openFilters ? faAngleDoubleDown : faAngleDoubleUp

    const chartZone = openCharts ? 'block' : 'hidden'
    const chartIcon = openCharts ? faAngleDoubleDown : faAngleDoubleUp

    const filteredFeedback = feedback.filter(feedback => _.difference(tags.map(t=> t.id), feedback.tags.map(t=> t.id)).length === 0)
    const chartFeedback = filteredFeedback.flatMap(feedback => feedback.tags.map(tag => tag.name)).reduce(getCount, {}) 
    const maxSize = Math.max(...Object.values(chartFeedback))

    const data = Object.entries(chartFeedback).map(([name, value]) => ({
        tag: name,
        tagCount: value,
        fullMark: maxSize,
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

                <div className={`${filterZone}`}>
                    <div className='bg-white shadow-lg rounded-lg p-4'>
                        <h2 className='mx-2'>Tags</h2>
                        <TagSelect tags={tags} setTags ={setTags} />
                    </div>
                    <div className='border-b-2 border-gray-border my-4' />
                </div>

                <div className={`${chartZone}`}>
                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <RadarChartRecharts data={data} maxSize={maxSize} />
                    </div>
                </div>

                <div className={`${chartZone}`}>
                    <div className='bg-white rounded-lg shadow-lg my-4'>
                        <SimpleScatterChart />
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