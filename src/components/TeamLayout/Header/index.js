import React, { useState } from 'react'
import logo from '../../../assets/pairamid-logo.png';
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faBalanceScale, faHistory, faCog, faCalendarAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import ListIconLink from './ListIconLink'

const Header = () => {
    const match = useRouteMatch()
    const [collapsed, setCollapsed] = useState(true)
    let classes = collapsed ? 'hidden' : 'block my-4'
    return (
        <div>
            <header className="p-3 border-gray-border border-b-2 lg:pt-12 lg:block lg:justify-center lg:h-screen lg:border-r-2 lg:border-b-0">
                <div className='flex items-center justify-between'>
                    <button className='focus:outline-none lg:hidden w-full text-left' onClick={(e)=> setCollapsed(!collapsed)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <Link className='lg:my-8 w-full flex justify-center items-center' to='/'>
                        <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo lg:mt-8" />
                    </Link>

                    <Link className='focus:outline-none lg:hidden w-full text-right' to={match.url}>
                        <FontAwesomeIcon icon={faUserFriends} />
                    </Link>
                </div>

                <ul onClick={()=> setCollapsed(true)} className={`lg:block lg:text-base ${classes}`}>
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
