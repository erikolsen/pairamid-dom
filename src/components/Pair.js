import React, {useEffect, useState} from 'react'
import { Droppable } from "react-beautiful-dnd";
import User from './User'

const Empty = ({pair, onDelete}) => {
    return (
        <div className=''>
            <button onClick={()=> onDelete(pair)} className='text-2xl text-red absolute top-0 right-0 mr-2' title='Delete Pair'>&#8854;</button>
            <div className={`w-12 h-12 mr-3 m-2 border-4 border-dashed border-gray-med rounded-full bg-white flex items-center justify-center`}>
                <p className="text-gray-med font-bold text-xl">+</p>
            </div>
        </div>
    )
}
const tagColor = (days) => {
    switch(true){
        case (days === 0):
            return 'white'
        case (days === 1 || days === 2):
            return 'green'
        case (days === 3 || days === 4):
            return 'yellow'
        default:
            return 'red'
    }
}

const Pair = ({pair, updatePairInfo, onDelete}) => {
    const [text, setText ] = useState(pair.info)
    useEffect(()=> { 
        if(pair.info !== text){
            setText(pair.info)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pair.info])

    let users =  pair.users.length ? pair.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>) : <Empty pair={pair} onDelete={onDelete} />
    return (
        <div className="bg-white shadow-lg rounded-lg flex">
            <div className={`bg-${tagColor(pair.history)} w-2 rounded-lg rounded-r-none`}></div>
            <Droppable droppableId={pair.uuid} direction='horizontal'>
                {(provided, _)=> {
                    return(
                        <div className="flex flex-col justify-between h-full w-full">
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
                            <div className='m-2 flex justify-between'>
                                <p className='text-xs flex items-center'>Day {pair.history}</p>
                                <input onBlur={() => updatePairInfo(text, pair.uuid)} 
                                       onChange={(e)=> setText(e.target.value)} 
                                       placeholder='Working on...' 
                                       className='px-2 border border-gray-light text-right' 
                                       type='text' 
                                       value={text} 
                                />
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

export default Pair