import React from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import Pair from './Pair'
import ParkingLot from './ParkingLot'
import { socket } from './DailyView'

const getPairData = (pairs, pairUuid) => {
    const pair =  pairs.find((p)=> p.uuid === pairUuid)
    const index = pairs.indexOf(pair)
    return {
        pair: pair,
        index: index,
        users: pairs[index].users,
    }
}

const PairGrid = ({pairs, setSaved}) => {
    const onDragEnd = (result) => { 
        const { destination, source, draggableId } = result;
        if(!destination){ return }
        const sourceData = getPairData(pairs, source.droppableId)
        const descData = getPairData(pairs, destination.droppableId)
        const descUsers = destination.droppableId === source.droppableId ? sourceData.users : descData.users
        const user = sourceData.users.find((user)=> user.uuid === draggableId)

        sourceData.users.splice(source.index, 1)
        descUsers.splice(destination.index, 0, user)

        setSaved(false)
        socket.emit('batch update pairs', [sourceData, descData])
    }

    const onWorkingChange = (event, uuid) => {
        event.preventDefault()
        const pairData = getPairData(pairs, uuid)
        pairData.pair.info = event.target.value
        setSaved(false)
        socket.emit('batch update pairs', [pairData] )
    }

    const deletePair = (pair)=> {
        socket.emit('delete pair', {uuid: pair.uuid})
    }

    const addPair = ()=> {
        socket.emit('add pair', {})
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                { pairs.map((pair, i) => <Pair onChange={onWorkingChange} onDelete={deletePair} pair={pair} key={pair.uuid} />) }
                <button onClick={addPair} className='flex items-center m-2 col-span-1 sm:col-span-2 xl:col-span-3'>
                    <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                    <span className='mx-2 text-lg text-gray'>Add Pair</span>
                </button>
            </div>
            <div className="col-span-1">
                <ParkingLot />
            </div>
        </DragDropContext>
    )
}

export default PairGrid
