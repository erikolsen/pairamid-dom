import React from 'react'

const UserData = ({user}) => {
    return (
        <div className={`w-12 h-12 m-2 border rounded-full bg-${user.team}-400 flex items-center justify-center`}>
            <p className="text-white font-bold text-xs">{user.initials}</p>
        </div>
    )
}

export default UserData