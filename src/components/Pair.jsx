import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import User from './User'

const Empty = () => {
    return (
        <div className={`w-12 h-12 m-2 border-4 border-dashed border-gray-400 rounded-full bg-white flex items-center justify-center`}>
            <p className="text-gray-400 font-bold text-xl">+</p>
        </div>
    )
}

const Pair = ({pair, onChange}) => {
    let users =  pair.users.length ? pair.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>) : <Empty />
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
                                {users.length ? users : <Empty />}
                                <div className='h-12 m-2'>
                                    { provided.placeholder }
                                </div>
                            </div>
                            <div className='m-2'>
                                <input onChange={(e) => onChange(e, pair.uuid)} placeholder='Working on...' className='w-full px-2 border border-solid' type='text' value={pair.info || ''} />
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

export default Pair