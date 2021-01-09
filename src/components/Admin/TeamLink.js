import React from 'react'
import { Link } from "react-router-dom";

const TeamLink = ({team}) => {
    return (
        <li>
            <Link className='' to={`/team/${team.uuid}`}>
                <span>Name: {team.name}({team.members})</span>
            </Link>
        </li>
    )
}

export default TeamLink