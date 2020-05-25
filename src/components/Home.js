import React from 'react'
import { useForm } from 'react-hook-form'
import logo from '../assets/pairamid-logo.png';
import daily from '../assets/todays_pairs.png';
import frequency from '../assets/pair_frequency.png';
import duration from '../assets/duration.png';
import history from '../assets/history.png';
import axios from 'axios'
import { API_URL } from '../constants'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({classes}) => {
    const history = useHistory()
    const team = localStorage.getItem('team');

    const onClick = (e) => { 
        e.preventDefault();
        history.push(`/team/${team}`)
    }

    return team && (
        <button className={`my-2 mx-4 sm:mx-16 ${classes}`} onClick={onClick}>
            <FontAwesomeIcon icon={faUsers} />
            <p className='font-bold leading-tight'>Team</p>
        </button>
    )
}

const CreateTeam = () => {
    const { register, handleSubmit } = useForm()
    const history = useHistory()

    const onUpdate = (data) => {
        axios.post(`${API_URL}/team`, data)
             .then((response) => {
                 history.push(`/team/${response.data.uuid}/settings`)
             })
    }
    return (
        <form onSubmit={handleSubmit(onUpdate)}>
            <div className='md:flex justify-between mr-2 items-center my-4'>
                <div className="w-full md:w-3/5 relative appearance-none label-floating my-4">
                    <input className="text-lg border-b border-gray-border pt-1 w-full" id="name" type="text" name="name" placeholder='Team Name' defaultValue={''} ref={register} />
                    <label className="absolute text-lg block top-0 left-0 w-full pt-1" htmlFor="name">
                        Team Name
                    </label>
                </div>
                <input style={{'backgroundColor': '#08697A'}} type='submit' value='START FOR FREE' className='w-full md:w-2/5 md:mx-2 p-3 text-white font-bold' />
            </div>
        </form>
    )
}

const Home = () => {
    return (
        <div className=''>
            <header className="flex items-center justify-between border-gray-border border-b-2 w-screen">
                <div className='my-4 mx-4 sm:mx-16'>
                    <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo" />
                </div>
                <IconButton />
            </header>
            <div className='h-full w-screen'>
                <div className='grid grid-cols-1 lg:grid-cols-2 my-8 sm:my-24'>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-16 lg:mr-8 my-8'>
                        <div className=''>
                            <p className='text-5xl font-bold leading-tight'>Pairamid helps you pair more efficiently</p>
                            <p className='text-xl my-4'>
                                Pair like you would in the office! 
                                If you see someone working solo ask if they want a pair.
                                Easily visualize cross functional pairing. 
                                Track pair frequency and duration to promote optimal pair switching.
                            </p>
                            <CreateTeam />
                        </div>
                    </div>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-8 lg:mr-16 '>
                        <div className='bg-white shadow-lg rounded-lg'>
                            <img className='' src={daily} alt='Full Daily View' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-full w-screen'>
                <p className='text-4xl font-bold text-center my-16 md:my-32'>Why Pairamid?</p>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-16 lg:mr-8'>
                        <div className="">
                            <img className='bg-white shadow-lg rounded-lg' src={duration} alt='Daily View' />
                        </div>
                    </div>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-8 lg:mr-16'>
                        <div className='my-16'>
                            <p className='text-4xl font-bold leading-tight mb-2 text-center'>Information at a glance</p>
                            <p className='text-2xl my-2'>The daily view provides a helpful visualization for your war room or remote stand up.</p>
                            <ul className='list-inside list-disc text-2xl my-2'>
                                <li className='my-2'>Quickly identify who is available to pair.</li>
                                <li className='my-2'>Pair duration identifies pairs in need of a pair switch.</li>
                                <li className='my-2'>Colorful roles allow for easy visualization of cross functional pairing.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-full w-screen my-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-16 lg:mr-8'>
                        <div className='my-8 md:my-16'>
                            <p className='text-4xl font-bold leading-tight mb-2 text-center'>Eliminate knowledge silos</p>
                            <p className='text-2xl my-2'>Pair frequency metrics help identify potential silos and promote cross functional pairing.</p>
                        </div>
                    </div>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-8 lg:mr-16 my-8'>
                        <div className="">
                            <img className='bg-white shadow-lg rounded-lg' src={frequency} alt='Pair Frequency' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-full w-screen my-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-16 lg:mr-8'>
                        <div className="">
                            <img className='bg-white shadow-lg rounded-lg' src={history} alt='Pair History' />
                        </div>
                    </div>
                    <div className='col-span-1 mx-4 sm:mx-16 lg:ml-8 lg:mr-16'>
                        <div className='my-8 md:my-16'>
                            <p className='text-4xl font-bold leading-tight mb-2 text-center'>View weekly history</p>
                            <p className='text-2xl my-2'>A trailing five day view shows recent pairs so you can identify pending pair swaps and more efficiently plan ahead.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-full w-screen my-8'>
                <p className='text-4xl text-center my-8 lg:mt-24 lg:mb-16 font-bold'>Learn More</p>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <a target='_blank' 
                       href='https://mattphilip.wordpress.com/2011/07/06/pair-like-an-egyptian/'
                       rel="noopener noreferrer"
                       className='col-span-1 shadow-lg rounded-lg border border-gray-border h-full mx-4 sm:mx-16 md:ml-16 md:mr-8 my-8'>
                        <img className='h-64 mx-auto mt-8' src='https://mattphilip.files.wordpress.com/2011/07/pairamid.jpg' alt='Pairamid' />
                        <div className='mt-16'>
                            <div className='m-4'>
                                <p className='text-center font-bold text-xl'>Pair like an Egyptian</p>
                                <p className='text-center'>Read more about the history of the pairamid from agile guru Matt Philip.</p>
                            </div>
                            <div className='flex items-center justify-between mx-4 my-1'>
                                <p>Read full article</p>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>
                    </a>
                    <a target='_blank' 
                       href='https://martinfowler.com/articles/on-pair-programming.html'
                       rel="noopener noreferrer"
                       className='col-span-1 shadow-lg rounded-lg border border-gray-border h-full mx-4 sm:mx-16 md:ml-8 md:mr-16 my-8'>
                        <img className='h-64 mx-auto mt-8' src='https://martinfowler.com/articles/on-pair-programming/driver_navigator.png' alt='Pairamid' />
                        <div className='mt-16'>
                            <div className='mx-4'>
                                <p className='text-center font-bold text-xl'>On Pair Programming</p>
                                <p className='text-center'>Great information and advice on pair programming by Martin Fowler.</p>
                            </div>
                            <div className='flex items-center justify-between mx-4 my-1'>
                                <p>Read full article</p>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div className='my-24 mx-4 sm:mx-16 border border-gray-border shadow-lg rounded-lg p-16'>
                <h1>Start using Pairamid today!</h1>
                <CreateTeam />
            </div>
        </div>
    )
}

export default Home