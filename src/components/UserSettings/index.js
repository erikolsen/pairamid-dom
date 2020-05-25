import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
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
                 setUsers(users.filter((user) => user.id !== parseInt(response.data)))
             })
    }

    const usersList = users.map((user) => <DisplayUser key={user.id} user={user} roles={roles} updateUser={updateUser} onDelete={deleteUser} />)
    return (
        <div>
            <h2>Users</h2>
            <div className='grid grid-cols-2 md:grid-cols-4'>
                { usersList }
            </div>
            <button onClick={addUser} className='flex items-center'>
                <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                <span className='mx-2 text-gray'>Add User</span>
            </button>
        </div>
    )
}

export default UserSettings
