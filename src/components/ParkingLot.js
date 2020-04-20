import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import User from './User'
import Pair from './Pair';

const ParkingLot = ({unpaired}) => {
    let users =  !!unpaired ? unpaired.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>) : <h1>Everyone is Paired</h1>
    if(!!unpaired) {
        return (
            <div className="bg-white px-6 py-2 rounded-lg">
                <h2>Unpaired Members</h2>

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
                                    <div className='h-12 m-2 w-full'>
                                        {provided.placeholder}
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        )
    } else {
        return ( <h1>hi</h1> )
    }
}

export default ParkingLot;