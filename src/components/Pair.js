import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import User from './User'

const Empty = ({pair, onDelete}) => {
    return (
        <div>
            <button onClick={()=> onDelete(pair)} className='text-2xl text-red absolute top-0 right-0 mr-2' title='Delete Pair'>&#8854;</button>
            <div className={`w-12 h-12 m-2 border-4 border-dashed border-gray-med rounded-full bg-white flex items-center justify-center`}>
                <p className="text-gray-med font-bold text-xl">+</p>
            </div>
        </div>
    )
}

const Pair = ({pair, onChange, onDelete}) => {
    const users =  pair.users.length ? pair.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>) : <Empty pair={pair} onDelete={onDelete} />
    return (
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-4">
            <Droppable droppableId={pair.uuid} direction='horizontal'>
                {(provided, _)=> {
                    return(
                        <div className="flex flex-col justify-between h-full">
                            <div 
                                className="flex flex-row flex-wrap relative"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {users.length ? users : <Empty pair={pair} onDelete={onDelete} />}
                                <div className='h-12 mr-2'>
                                    { provided.placeholder }
                                </div>
                            </div>
                            <div className='mt-2'>
                                <input onChange={(e) => onChange(e, pair.uuid)} placeholder='Working on...' className='w-full px-2 border border-solid border-gray-light' type='text' value={pair.info || ''} />
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

export default Pair