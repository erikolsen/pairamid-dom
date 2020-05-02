import React from 'react';
import logo from '../../assets/pairamid-logo.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faBalanceScale, faCog, faHistory } from '@fortawesome/free-solid-svg-icons'

const ListIconLink = ({path, icon, text}) => {
    return (
        <li className='text-gray mx-1 lg:my-2 lg:mx-0'>
            <Link className='' to={path}>
                <FontAwesomeIcon icon={icon} />
                <span className='ml-2'>{text}</span>
            </Link>
        </li>
    )
}

const Header = () => (
    <div>
        <header className="flex items-center justify-between lg:pt-12 lg:block p-4 border-gray-border border-b-2 lg:justify-center lg:h-screen lg:border-r-2 lg:border-b-0">
            <Link to='/'>
                <div className='my-4 lg:my-8'>
                    <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo lg:mt-8" />
                </div>
            </Link>
            <ul className='flex lg:block text-xs lg:text-base'>
                <ListIconLink path='/' icon={faUserFriends} text='Today' />
                <ListIconLink path='/frequency' icon={faBalanceScale} text='Frequency' />
                <ListIconLink path='/history' icon={faHistory} text='History' />
                <ListIconLink path='/settings' icon={faCog} text='Settings' />
            </ul>
        </header>
    </div>
);

export default Header;
