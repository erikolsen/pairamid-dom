import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../constants'

const RoleSelect = ({label, selected, onSelect}) => {
    const { teamId } = useParams()
    const [roles, setRoles] = useState([])
    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/roles`)
            .then((response)=> {
                setRoles(response.data)
            })
    }, [setRoles, teamId])

    const options = roles.map((role) => <option key={role.id} value={role.name}>{role.name}</option> )

    return (
        <label className='py-2 pr-2'>
            {label}:
            <select className='bg-white' value={selected} onChange={(e) => onSelect(e.target.value)}>
                <option value="">ALL</option>
                { options }
            </select>
        </label>
    )
}

export default RoleSelect;