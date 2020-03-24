import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import User from './User'

const Pair = ({pair, id, onChange}) => {
    let users =  Object.entries(pair.users).map(([id, user], i)=> <User index={i} id={id} user={user} key={id}/>)
    return (
        <div className="bg-white shadow-lg rounded-lg m-2">
            <Droppable droppableId={id} direction='horizontal'>
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
                            <div>
                                <input onChange={(e) => onChange(e, id)} placeholder='Working on...' className='px-2 border border-solid' type='text' value={pair.working} />
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

export default Pair