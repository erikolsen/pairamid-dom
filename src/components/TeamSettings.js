import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'
import RoleSettings from './RoleSettings'
import UserSettings from './UserSettings'
import { useParams } from 'react-router-dom'

const TeamSettings = () => {
    const { teamId } = useParams()
    const [roles, setRoles] = useState([])
    const [name, setName] = useState('')

    useEffect(()=> {
        axios.get(`${API_URL}/team/${teamId}`)
            .then((response)=> {
                setRoles(response.data.roles)
                setName(response.data.name)
            })
    }, [teamId])

    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h1>{name} Settings</h1>
                    </div>
                </header>
                <div className='w-full'>
                    <UserSettings roles={roles} />
                    <div className='border-b-2 border-gray-border my-4' />
                    <RoleSettings roles={roles} setRoles={setRoles} />
                </div>
            </section>
        </main>
    )
}

export default TeamSettings
