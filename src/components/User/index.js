import React, { useState, useEffect } from 'react'
import Header from './Header';
import axios from 'axios'
import { API_URL } from '../../constants'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import FeedbackReceived from './Feedback/FeedbackReceived'

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

    if (!user) { return null }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-screen">
                <section>
                    <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-1 mb-4'>
                        <div className='w-full flex justify-between items-center'>
                            <h1>{user.full_name || user.username}</h1>
                        </div>
                    </header>
                    <FeedbackReceived user={user} />
                </section>
            </main>
        </div>
    )
}

export default User