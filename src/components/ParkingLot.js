import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const ParkingLot = () => {
    return (
        <div className="bg-white p-6 rounded-lg">
            <h2>Available Team Members</h2>

            <Droppable droppableId="available">
                {(provided, _) => {
                    return (
                        <div>
                            <div
                                className="flex flex-row flex-wrap relative"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
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
}

export default ParkingLot;