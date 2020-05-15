import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'
import AddRole from './AddRole'
import DisplayRole from './DisplayRole'

const RoleSettings = () => {
    const [roles, setRoles] = useState([])
    const updateRole = (data) => { 
        axios.put(`${API_URL}/role/${data.id}`, data) 
             .then((response) => {
                setRoles(roles.map(role => (role.id === response.data.id ? Object.assign({}, response.data) : role )))
             })
    }

    const addRole = (data) => { 
        axios.post(`${API_URL}/role`, data)
             .then((response) => {
                 setRoles([...roles, response.data])
             })
    }

    const deleteRole = (id) => { 
        axios.delete(`${API_URL}/role/${id}`)
             .then((response) => {
                 setRoles(roles.filter((role) => role.id !== parseInt(response.data)))
             })
    }

    useEffect(()=> {
        axios.get(`${API_URL}/roles`)
            .then((response)=> {
                setRoles(response.data)
            })
    }, [setRoles])

    const roleList = roles.map((role) => <DisplayRole key={role.id} role={role} updateRole={updateRole} onDelete={deleteRole} />)
    return (
        <div>
            <p>Roles</p>
            {roleList}
            <AddRole action={addRole} />
        </div>
    )
}

export default RoleSettings
