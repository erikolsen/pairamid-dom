import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListIconLink = ({path, icon, text}) => {
    return (
        <Link to={path}>
            <li className='text-gray my-2 lg:mx-0 hover:text-green-icon hover:bg-gray-light lg:hover:bg-white'>
                <FontAwesomeIcon icon={icon} />
                <span className='ml-2'>{text}</span>
            </li>
        </Link>
    )
}

export default ListIconLink;
