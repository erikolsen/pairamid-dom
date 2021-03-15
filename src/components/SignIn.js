import React, {useState} from 'react'
import logo from '../assets/pairamid-logo.png';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { API_URL } from '../constants'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const parseTeams = (teams)=> {return teams ? teams.split(',') : ''}
const IconButton = ({classes}) => {
    const history = useHistory()
    let teams = parseTeams(localStorage.getItem('pairamid-teams'))

    const onClick = (e) => { 
        e.preventDefault();
        teams.length > 1 ? history.push(`/teams`) : history.push(`/team/${teams}`)
    }

    const iconName = teams.length > 1 ? 'Teams' : 'Team'

    return teams && (
        <button className={`my-2 mx-4 sm:mx-16 ${classes}`} onClick={onClick}>
            <FontAwesomeIcon icon={faUsers} />
            <p className='font-bold leading-tight'>{iconName}</p>
        </button>
    )
}

const SignInUser = () => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(!showPassword)
    const { register, handleSubmit, errors } = useForm()
    const history = useHistory()

    const onUpdate = (data) => {
        axios.post(`${API_URL}/login`, data)
            .then((response) => {
                localStorage.setItem('currentUser', JSON.stringify(response.data))
                history.push(`/users/${response.data.uuid}`)
            })
    }
    const emailError = errors.email ? 'border border-red' : 'border border-gray-border' 
    const initialsError = errors.initials ? 'border border-red' : 'border border-gray-border' 
    const passwordType = showPassword ? 'text' : 'password'
    const passwordIconClass = showPassword ? '' : 'opacity-50'

    return (
        <form onSubmit={handleSubmit(onUpdate)}>
            <div className='flex flex-col items-center justify-center p-4'>
                <input className={`text-lg w-full md:w-3/5 outline-none rounded-md px-2 py-1 my-2 ${emailError}`}
                        id='email'
                        type='text'
                        name='email'
                        placeholder='Enter email address'
                        defaultValue=''
                        ref={register({
                            required: true,
                        })} />
                { errors.email && <p className='text-red'>Email is required</p> }
                <div className='w-full md:w-3/5 relative appearance-none my-2'>
                    <input 
                        className={`w-full text-lg outline-none rounded-md px-2 py-1 ${initialsError}`}
                        id='password'
                        type={passwordType}
                        name='password'
                        placeholder='Enter password'
                        defaultValue={''} 
                        ref={register({required: true})} 
                    />
                    <div onClick={togglePassword} className={`absolute bottom-0 right-0 my-1 mx-3 ${passwordIconClass}`}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                </div>
                { errors.password && <p className='text-red'>Password is required</p> }
                <div className='w-full md:w-3/5 flex justify-between items-center'>
                    <Link className='text-green-icon' to={`/signup`} >Create Account</Link>
                    <input type='submit' value='Login' className={`rounded-md bg-green-icon w-full md:w-2/5 md:mx-2 p-3 text-white font-bold my-4`} />
                </div>
            </div>
        </form>
    )
}

const SignIn = () => {
    return (
        <div className=''>
            <header className='flex items-center justify-between border-gray-border border-b-2 w-screen'>
                <div className='my-4 mx-4 sm:mx-16'>
                    <img src={logo} alt='Paramid Logo' width='169' height='40' className='w-full max-w-logo' />
                </div>
                <IconButton />
            </header>
            <main className='h-screen bg-gray-light p-12'>
                <section>
                    <div className='bg-white rounded-lg shadow-lg mx-8 md:mx-16'>
                        <p className='font-bold pt-8 text-center text-lg'>Please login to continue</p>
                        <SignInUser />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default SignIn
