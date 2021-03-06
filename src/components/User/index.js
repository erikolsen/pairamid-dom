import React, { useState, useEffect } from 'react'
import Header from './Header';
import axios from 'axios'
import { API_URL } from '../../constants'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const User = () => {
    const userId = '097d2bbd-284a-4ff7-a48b-2dba234d6988'
    const user = {username: 'EO'}
    const totalFeedbackRecieved = 14
    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
                <section>
                    <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                        <div className='w-full flex justify-between items-center'>
                            <h1>User {user.username}</h1>
                        </div>
                    </header>

                    <div className='grid grid-cols-2 col-gap-4 row-gap-4'>
                        <Link 
                            className='col-span-2 md:col-span-1 bg-white rounded-lg flex items-center justify-between p-2' 
                            to={{
                                pathname:`/users/${userId}/feedback-given`,
                                state: {user: user}
                            }}
                        >
                            <div className={`bg-gray-med col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                                <p className="text-black font-bold text-lg">0</p>
                            </div>
                            <h2 className='text-center'>Monthly Feedback Given</h2>
                            <button className='cursor-pointer'>
                                <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                            </button>
                        </Link>

                        <Link 
                            className='col-span-2 md:col-span-1 bg-white rounded-lg flex items-center justify-between p-2' 
                            to={{
                                pathname:`/users/${userId}/feedback-received`,
                                state: {user: user}
                            }}
                        >
                            <div className={`bg-green-500 col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                                <p className="text-black font-bold text-lg">{totalFeedbackRecieved}</p>
                            </div>
                            <h2 className='text-center'>Monthly Feedback Recieved</h2>
                            <button className='cursor-pointer'>
                                <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                            </button>
                        </Link>

                        <div className='col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg'>
                            <h2 className='mt-4 text-center'>Pairing Totals</h2>
                            <div className='my-2 flex justify-center'>
                                <div>
                                    <div className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}>
                                        <p className='text-center font-bold'>{120}</p>
                                    </div>
                                    <p className='text-center'>Total</p>
                                    <p className='text-center'>Sessions</p>
                                </div>
                                <div>
                                    <div className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}>
                                        <p className='text-center font-bold'>{32}</p>
                                    </div>
                                    <p className='text-center'>Different</p>
                                    <p className='text-center'>Users</p>
                                </div>
                                <div>
                                    <div className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}>
                                        <p className='text-center font-bold'>{8}</p>
                                    </div>
                                    <p className='text-center'>Unique</p>
                                    <p className='text-center'>Roles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default User
