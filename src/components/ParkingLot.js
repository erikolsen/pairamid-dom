import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import User from './User'

const ParkingLot = ({unpaired}) => {
    let users = unpaired.users.length > 0 ? unpaired.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>) : 
                                            <h1 className='text-center w-full'>Full House Today</h1>
    return (
        <div className="bg-white px-4 py-2 rounded-lg">
            <h2 className='m-2 text-center'>Around the Office</h2>

            <Droppable droppableId={unpaired.uuid} direction='horizontal'>
                {(provided, _) => {
                    return (
                        <div>
                            <div
                                className='flex flex-row flex-wrap relative'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                { users }
                                <div className='m-2 w-full'>
                                    {provided.placeholder}
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}

export default ParkingLot;