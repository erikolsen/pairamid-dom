import React, { useState, useEffect } from 'react'
import Header from './Header';
import axios from 'axios'
import { API_URL } from '../../constants'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
        return { 'Authorization': `Bearer ${currentUser.access_token}` };
    } else {
        return {};
    }
}

const User = () => {
    const { userId } = useParams()
    const history = useHistory()
    const [user, setUser] = useState()
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(()=> {
        axios.get(`${API_URL}/users/${userId}`, {headers: authHeader()})
            .then((response)=> {
                setUser(response.data)
            })
            .catch((error)=> {
                console.log('error: ', error)
                history.push('/login')
            })
    }, [setUser, userId])
    const totalFeedbackRecieved = 14
    if (!user) { return null }
    console.log('User', user)
    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
                <section>
                    <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                        <div className='w-full flex justify-between items-center'>
                            <h1>{user.full_name || user.username}</h1>
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
                    </div>
                </section>
            </main>
        </div>
    )
}

export default User
