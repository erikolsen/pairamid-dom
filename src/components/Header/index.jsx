import React, { useState } from 'react'
import logo from '../../assets/pairamid-logo.png';
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faBalanceScale, faHistory, faCog, faCalendarAlt, faBars } from '@fortawesome/free-solid-svg-icons'

const ListIconLink = ({path, icon, text}) => {
    return (
        <li className='text-gray mx-1 my-2 lg:mx-0'>
            <Link className='' to={path}>
                <FontAwesomeIcon icon={icon} />
                <span className='ml-2'>{text}</span>
            </Link>
        </li>
    )
}

const Header = () => {
    const match = useRouteMatch()
    const [collapsed, setCollapsed] = useState(true)
    let classes = collapsed ? 'hidden' : 'block my-4'
    return (
        <div>
            <header className="p-4 border-gray-border border-b-2 lg:pt-12 lg:block lg:justify-center lg:h-screen lg:border-r-2 lg:border-b-0">
                <div className='flex items-center justify-between '>
                    <Link to='/'>
                        <div className='lg:my-8'>
                            <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo lg:mt-8" />
                        </div>
                    </Link>
                    <button className='focus:outline-none lg:hidden' onClick={(e)=> setCollapsed(!collapsed)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

                <ul className={`lg:block lg:text-base ${classes}`}>
                    <ListIconLink path={`${match.url}`} icon={faUserFriends} text='Today' />
                    <ListIconLink path={`${match.url}/frequency`} icon={faBalanceScale} text='Frequency' />
                    <ListIconLink path={`${match.url}/history`} icon={faHistory} text='History' />
                    <ListIconLink path={`${match.url}/settings`} icon={faCog} text='Settings' />
                    <ListIconLink path={`${match.url}/calendar`} icon={faCalendarAlt} text='Calendar' />
                </ul>
            </header>
        </div>
    )
}

export default Header;
