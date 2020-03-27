import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import User from './User'

const Pair = ({pair, onChange}) => {
    let users =  pair.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>)
    return (
        <div className="bg-white shadow-lg rounded-lg m-2">
            <Droppable droppableId={pair.uuid} direction='horizontal'>
                {(provided, snapshot)=> {
                    return(
                        <div>
                            <div 
                                className="flex flex-row"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {users}
                                {provided.placeholder}
                            </div>
                            <div className='m-2'>
                                <input onChange={(e) => onChange(e, pair.uuid)} placeholder='Working on...' className='w-full px-2 border border-solid' type='text' value={pair.working} />
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

export default Pair