import React from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants'
import DisplayRole from './DisplayRole'
import { useParams } from 'react-router-dom'

const RoleSettings = ({roles, setRoles}) => {
    const { teamId } = useParams()
    const updateRole = (data) => { 
        axios.put(`${API_URL}/team/${teamId}/role/${data.id}`, data) 
             .then((response) => {
                setRoles(roles.map(role => (role.id === response.data.id ? Object.assign({}, response.data) : role )))
             })
    }

    const addRole = () => { 
        axios.post(`${API_URL}/team/${teamId}/role`)
             .then((response) => {
                 setRoles([...roles, response.data])
             })
    }

    const deleteRole = (id) => { 
        axios.delete(`${API_URL}/team/${teamId}/role/${id}`)
             .then((response) => {
                 setRoles(roles.filter((role) => role.id !== parseInt(response.data)))
             })
    }

    const roleList = roles.map((role) => <DisplayRole key={role.id} role={role} updateRole={updateRole} onDelete={deleteRole} />)
    return (
        <div>
            <h2>Roles</h2>
            <div className='grid grid-cols-2 md:grid-cols-4'>
                {roleList}
            </div>
            <button data-cy='add-role' onClick={addRole} className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='mx-2 text-gray'>Add Role</span>
            </button>
        </div>
    )
}

export default RoleSettings
