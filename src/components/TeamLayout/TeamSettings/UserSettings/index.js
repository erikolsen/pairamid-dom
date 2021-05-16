import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../constants'
import DisplayUser from './DisplayUser'
import { useParams } from 'react-router-dom'

const UserSettings = ({roles}) => {
    const { teamId } = useParams()
    const [users, setUsers] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}/users`)
            .then((response)=> {
                setUsers(response.data)
            })
    }, [roles, teamId])

    const updateUser = (data) => { 
        axios.put(`${API_URL}/team/${teamId}/user/${data.userId}`, data) 
             .then((response) => {
                setUsers(users.map(user => (user.id === response.data.id ? Object.assign({}, response.data) : user )))
             })
    }

    const addUser = () => { 
        axios.post(`${API_URL}/team/${teamId}/user`)
             .then((response) => {
                 setUsers([...users, response.data])
             })
    }

    const deleteUser = (id) => { 
        axios.delete(`${API_URL}/team/${teamId}/user/${id}`)
             .then((response) => {
                setUsers(
                    users.map(user => (user.id === response.data.id ? Object.assign({}, response.data) : user ))
                         .filter(u => !u.hardDelete)
                )
             })
    }

    const reviveUser = (id) => { 
        axios.put(`${API_URL}/team/${teamId}/user/${id}/revive`)
             .then((response) => {
                setUsers(users.map(user => (user.id === response.data.id ? Object.assign({}, response.data) : user )))
             })
    }

    const usersList = users.map((user) => <DisplayUser key={user.id} user={user} roles={roles} reviveUser={reviveUser} updateUser={updateUser} onDelete={deleteUser} />)
    return (
        <div>
            <div className='my-2'>
                <h2>Users</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4'>
                { usersList }
            </div>
            <button data-cy='add-user' onClick={addUser} className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='mx-2 text-gray'>Add User</span>
            </button>
        </div>
    )
}

export default UserSettings
