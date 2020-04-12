import React from 'react'
import { Draggable } from "react-beautiful-dnd";
const colorMapper = {
    "HOME": 'indigo',
    "VISITOR": 'blue'
}

const User = ({ user, index }) => {
    return (
        <div>
            <Draggable draggableId={user.uuid} index={index}>
                {provided => (
                    <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className={`w-12 h-12 m-2 rounded-full bg-${colorMapper[user.role]}-400 flex items-center justify-center`}>
                            <p className="text-white font-bold text-xs">{user.username.toUpperCase()}</p>
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default User
