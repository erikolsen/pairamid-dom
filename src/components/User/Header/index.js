import React, { useState } from 'react'
import logo from '../../../assets/pairamid-logo.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faUserPlus, faComments, faCommentDots, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import ListIconLink from './ListIconLink'
import SignOut from '../../SignOut'

const AuthLink = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        return <SignOut />
    } else {
        return <ListIconLink path={`/login`} icon={faUserPlus} text='Login' />
    }
}

const UserLinks = ({ currentUser }) => {
    const userId = currentUser.uuid
    const [copySuccess, setCopySuccess] = useState('')
    const copyLink = () => {
        const feedbackUrl = `/users/${userId}/feedback/new`
        navigator.clipboard.writeText(window.location.origin + feedbackUrl)
        setCopySuccess('Copied to Clipboard!')
        setTimeout(() => setCopySuccess(''), 3000);
    }
    return (
        <div>
            <ListIconLink path={`/users/${userId}`} icon={faComments} text='Feedback' />
            <ListIconLink path={`/users/${userId}/feedback/new`} icon={faCommentDots} text='Feedback Form' />
            <li onClick={copyLink} className='cursor-pointer text-gray my-2 lg:mx-0 hover:text-green-icon hover:bg-gray-light lg:hover:bg-white'>
                <FontAwesomeIcon icon={faShareSquare} />
                <span className='ml-2'>Share Link</span>
            </li>
            <li className='text-gray my-2 lg:mx-0 hover:text-green-icon hover:bg-gray-light lg:hover:bg-white'>
                <span className=''>{copySuccess}</span>
            </li>
        </div>
    )
}

const Header = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [collapsed, setCollapsed] = useState(true)
    let classes = collapsed ? 'hidden' : 'block my-4'
    return (
        <div>
            <header data-cy='header' className="p-3 border-gray-border border-b-2 lg:pt-12 lg:block lg:justify-center lg:h-screen lg:border-r-2 lg:border-b-0">
                <div className='flex items-center justify-between'>
                    <button className='focus:outline-none lg:hidden w-full text-left' onClick={() => setCollapsed(!collapsed)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <Link className='lg:my-8 w-full flex justify-center items-center' to='/'>
                        <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo lg:mt-8" />
                    </Link>

                    {currentUser && <Link className='focus:outline-none lg:hidden w-full text-right' to={`/users/${currentUser.uuid}`}>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>}
                </div>
                <ul onClick={() => setCollapsed(true)} className={`lg:block lg:text-base ${classes}`}>
                    {currentUser && <UserLinks currentUser={currentUser} />}
                    <div className='border-b-2 border-gray-border my-4' />
                    <AuthLink />
                </ul>
            </header>
        </div>
    )
}

export default Header;
