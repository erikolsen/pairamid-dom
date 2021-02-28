import React, {useState} from 'react'
import logo from '../../assets/pairamid-logo.png';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { API_URL } from '../../constants'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faArrowRight, faProjectDiagram, faEye } from '@fortawesome/free-solid-svg-icons'

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

const SignUpUser = ({email}) => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(!showPassword)

    const { register, handleSubmit, errors, formState } = useForm()
    const history = useHistory()
    const EMAIL_PATTERN = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    let disabledClass = !formState.isDirty || !formState.isValid ? 'opacity-50' : '' 
    React.useEffect(() => {
        console.log('Disabled', disabledClass)
      },[formState]);


    const onUpdate = (data) => {
        console.log('Data', data)
        // axios.post(`${API_URL}/team`, data)
        //      .then((response) => {
        //          history.push(`/team/${response.data.uuid}/settings`)
        //      })
    }
    const emailError = errors.email ? 'border border-red' : 'border border-gray-border' 
    const initialsError = errors.initials ? 'border border-red' : 'border border-gray-border' 
    const passwordType = showPassword ? 'text' : 'password'
    const passwordIconClass = showPassword ? '' : 'opacity-50'

    return (
        <form onSubmit={handleSubmit(onUpdate)}>
            <div className='flex flex-col items-center justify-center p-4'>
                <div className='w-full md:w-3/5 relative appearance-none label-floating my-2'>
                    <input className={`text-lg py-1 px-3 w-full outline-none rounded-lg ${emailError}`}
                           id='email'
                           type='text'
                           name='email'
                           placeholder='Email'
                           defaultValue={''} 
                           ref={register({
                               required: true,
                               pattern: EMAIL_PATTERN
                            })} />
                    <label className='m-px text-gray-med absolute text-lg block top-0 left-0 w-full py-1 px-3 rounded-lg' htmlFor='email'>
                      Email
                    </label>
                </div>
                { errors.email && <p className='text-red'>Email is required</p> }
                <div className='w-full md:w-3/5 relative appearance-none label-floating my-2'>
                    <input className={`text-lg pt-1 px-3 w-full outline-none border border-gray-border rounded-lg`}
                           id='firstName'
                           type='text'
                           name='firstName'
                           placeholder='First Name'
                           defaultValue={''} 
                           ref={register({
                               required: true,
                               minLength: 1 
                            })} />
                    <label className='m-px text-gray-med absolute text-lg block top-0 left-0 w-full pt-1 px-3 rounded-lg' htmlFor='firstName'>
                        First Name
                    </label>
                </div>
                { errors.firstName && <p className='text-red'>Minimum 1 character required</p> }
                <div className='w-full md:w-3/5 relative appearance-none label-floating my-2'>
                    <input className={`text-lg pt-1 px-3 w-full outline-none border border-gray-border rounded-lg`}
                           id='lastName'
                           type='text'
                           name='lastName'
                           placeholder='Last Name'
                           defaultValue={''} 
                           ref={register({
                               required: true, 
                               minLength: 1 
                           })} />
                    <label className='m-px text-gray-med absolute text-lg block top-0 left-0 w-full pt-1 px-3 rounded-lg' htmlFor='lastName'>
                        Last Name
                    </label>
                </div>
                { errors.lastName && <p className='text-red'>Minimum 1 character required</p> }
                <div className='w-full md:w-3/5 relative appearance-none label-floating my-2'>
                    <input 
                        className={`w-full text-lg pt-1 px-3 outline-none rounded-lg ${initialsError}`}
                        id='password'
                        type={passwordType}
                        name='password'
                        placeholder='Password'
                        defaultValue={''} 
                        ref={register({required: true})} 
                    />
                    <label className='m-px text-gray-med absolute text-lg block top-0 left-0 w-full pt-1 px-3 rounded-lg' htmlFor='password'>
                        Password
                    </label>
                    <div onClick={togglePassword} className={`absolute bottom-0 right-0 my-2 mx-3 ${passwordIconClass}`}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                </div>
                { errors.password && <p className='text-red'>Password is required</p> }
                <input type='submit' value='Continue' className={`bg-green-icon w-full md:w-2/5 md:mx-2 p-3 text-white font-bold my-4 ${disabledClass}`} />
            </div>
        </form>
    )
}

const SignUp = (props) => {
    const { email } = props.location.state
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
                        <p className='font-bold pt-8 text-center text-lg'>Sign up for your free account</p>
                        <SignUpUser email={email} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default SignUp
