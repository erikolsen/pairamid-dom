import React, { useState, useEffect } from 'react'
import Header from './Header';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { API_URL } from '../../constants'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export const CreateFeedbackRequest = ({user}) => {
    // const { teamId } = useParams()
    const [selected, setSelected] = useState('')
    const [giverId, setGiverId] = useState(user.username)
    const [requestMessage, setRequestMessage] = useState(null)
    const { register, handleSubmit, errors } = useForm()

    const onUpdate = (data) => {
        console.log('Submitting')
        // axios.post(`${API_URL}/team`, data)
        //      .then((response) => {
        //          history.push(`/team/${response.data.uuid}/settings`)
        //      })
    }
    return (
        <div className=''>
            <form className='bg-white shadow-lg rounded-lg rounded-b-none p-4' onSubmit={handleSubmit(onUpdate)}>
                <div className=''>
                    <div className='flex items-center justify-between'>
                        <h2 className=''>Create Feedback Request</h2>
                    </div>
                    <textarea 
                        name='feedback-text' 
                        className='h-48 border border-gray-border w-full my-2' 
                        value={requestMessage} 
                        onChange={(e) => setRequestMessage(e.target.value)} 
                        ref={register} 
                    />
                    <input className='' type='hidden' name="id" defaultValue={user.id} ref={register} />
                    <input type='submit' value={'Create New Link'} className='bg-green-icon w-full p-3 text-white font-bold' />
                </div>
                { errors.name && <p className='text-red'>Message text is required.</p> }
            </form>
        </div>
    )
}

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
    if (!user) { return null }
    console.log('User', user)
    return (
        <div className='grid grid-cols-1 lg:grid-cols-8'>
            <Header />
            <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-screen">
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
                                pathname:`/users/${userId}/feedback/given`,
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
                                pathname:`/users/${userId}/feedback/received`,
                                state: {user: user}
                            }}
                        >
                            <div className={`bg-green-500 col-span-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center`}>
                                <p className="text-black font-bold text-lg">{user.feedback_received.length}</p>
                            </div>
                            <h2 className='text-center'>Monthly Feedback Recieved</h2>
                            <button className='cursor-pointer'>
                                <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
                            </button>
                        </Link>

                        <Link 
                            className='col-span-2 md:col-span-1 bg-white rounded-lg flex items-center justify-between p-2' 
                            to={{
                                pathname:`/users/${userId}/feedback/new`,
                                state: {user: user}
                            }}
                        >
                            <h2 className='text-center'>Feedback Request form</h2>
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
