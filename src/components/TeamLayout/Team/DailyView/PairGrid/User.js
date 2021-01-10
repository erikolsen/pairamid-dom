import React from 'react'
import { Draggable } from "react-beautiful-dnd";
const User = ({ user, index }) => {
    return (
        <div >
            <Draggable draggableId={user.uuid} index={index}>
                {provided => (
                    <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        data-cy={`icon-${user.username}`} 
                    >
                        <div style={{'backgroundColor': user.role.color}} className={`bg-gray-med w-12 h-12 mr-3 m-2 border-gray-border rounded-full flex items-center justify-center`}>
                            <p className="text-white font-bold text-xs">{user.username}</p>
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default User
