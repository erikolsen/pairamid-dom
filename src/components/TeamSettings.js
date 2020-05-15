import React from 'react'
import RoleSettings from './RoleSettings'


const TeamSettings = () => {
    return (
        <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h1>Team Settings</h1>
                    </div>
                </header>
                <div className='w-full'>
                    <RoleSettings />
                </div>
            </section>
        </main>

    )
}

export default TeamSettings
