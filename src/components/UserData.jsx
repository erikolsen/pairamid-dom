import React from 'react'
const colorMapper = {
    "HOME": 'indigo',
    "VISITOR": 'blue'
}
const UserData = ({user}) => {
    return (
        <div className={`w-12 h-12 m-2 rounded-full bg-${colorMapper[user.role]}-400 flex items-center justify-center`}>
            <p className="text-white font-bold text-xs">{user.username.toUpperCase()}</p>
        </div>
    )
}

export default UserData