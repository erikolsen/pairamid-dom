import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import DisplayUser from './DisplayUser'

const UserSettings = ({roles}) => {
    const [users, setUsers] = useState([])

    useEffect(()=> {
        axios.get(`${API_URL}/users`)
            .then((response)=> {
                setUsers(response.data)
            })
    }, [roles])

    const updateUser = (data) => { 
        axios.put(`${API_URL}/user/${data.userId}`, data) 
             .then((response) => {
                setUsers(users.map(user => (user.id === response.data.id ? Object.assign({}, response.data) : user )))
             })
    }

    const addUser = () => { 
        axios.post(`${API_URL}/user`)
             .then((response) => {
                 setUsers([...users, response.data])
             })
    }

    const deleteUser = (id) => { 
        axios.delete(`${API_URL}/user/${id}`)
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
