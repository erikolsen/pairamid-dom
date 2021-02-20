import React from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import FeedbackCard from './FeedbackCard'
import { feedback } from './testData'
import CreateFeedback from './CreateFeedback'

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
                    { feedback.map((feedback) => <FeedbackCard key={feedback.uuid} feedback={feedback} />) }
                </div>
            </section>
        </main>
    )
}

export default FeedbackGiven