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
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({classes}) => {
    const history = useHistory()
    const team = localStorage.getItem('team');

    const onClick = (e) => { 
        e.preventDefault();
        history.push(`/team/${team}`)
    }

    return team && (
        <button className={`my-2 mx-4 ${classes}`} onClick={onClick}>
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
            <div className='flex justify-between mr-2 items-center'>
                <div className="w-3/4 relative appearance-none label-floating">
                    <input className="text-lg border-b border-gray-border pt-1 px-3 leading-;ormal w-full" id="name" type="text" name="name" placeholder='Team Name' defaultValue={''} ref={register} />
                    <label className="absolute text-lg block top-0 left-0 w-full px-3 pt-1 leading-normal" htmlFor="name">
                        Team Name
                    </label>
                </div>
                <input type='submit' value='START FOR FREE' className='mx-2 p-3 bg-indigo-400 text-white font-bold' />
            </div>
        </form>
    )
}

const Home = () => {
    return (
        <div className=''>
            <header className="flex items-center justify-between border-gray-border border-b-2 w-screen">
                <div className='my-4 mx-24'>
                    <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo" />
                </div>
                <IconButton />
            </header>
            <div className='h-full w-screen'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <div className='mx-24 my-24'>
                            <p className='text-5xl font-bold leading-tight'>Pairamid brings pairs together, wherever they are</p>
                            <p className='font-semibold'>See who is available to pair, easily visualize cross functional pairing, and track pair frequency and duration to promote optimal pair switching.</p>
                            <CreateTeam />
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-white shadow-lg rounded-lg my-24 mx-8">
                            <img className='' src={daily} alt='Paramid Logo' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-full w-screen'>
                <p className='text-4xl font-bold text-center m-24'>Why Pairamid?</p>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <div className="mx-24">
                            <img className='bg-white shadow-lg rounded-lg' src={duration} alt='Paramid Logo' />
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='mx-8'>
                            <p className='text-5xl font-bold leading-tight'>Pairamid brings pairs together, wherever they are</p>
                            <p className='font-semibold'>See who is available to pair, easily visualize cross functional pairing, and track pair frequency and duration to promote optimal pair switching.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-full w-screen my-8'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <div className='mx-24'>
                            <p className='text-5xl font-bold leading-tight'>Pairamid brings pairs together, wherever they are</p>
                            <p className='font-semibold'>See who is available to pair, easily visualize cross functional pairing, and track pair frequency and duration to promote optimal pair switching.</p>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="px-8">
                            <img className='bg-white shadow-lg rounded-lg' src={frequency} alt='Paramid Logo' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-full w-screen my-8'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <div className="px-24">
                            <img className='bg-white shadow-lg rounded-lg' src={history} alt='Paramid Logo' />
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='mx-8'>
                            <p className='text-5xl font-bold leading-tight'>Pairamid brings pairs together, wherever they are</p>
                            <p className='font-semibold'>See who is available to pair, easily visualize cross functional pairing, and track pair frequency and duration to promote optimal pair switching.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home