import React from 'react'
import { Link } from "react-router-dom";
import { format } from 'date-fns'


const TeamLink = ({team}) => {
    const displayDate = format(new Date(team.lastActive), 'MM/dd/yyyy')
    return (
        <li>
            <Link className='' to={`/team/${team.uuid}`}>
                <span>{team.name} - Last Active {displayDate}</span>
            </Link>
        </li>
    )
}

export default TeamLink