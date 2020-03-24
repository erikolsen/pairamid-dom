import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import UserData from './UserData'

const User = ({ id, user, index }) => {
    return (
        <div>
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <UserData user={user} />
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default User
