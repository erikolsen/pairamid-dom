import React from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import Pair from './Pair'
import ParkingLot from './ParkingLot'
import { SOCKET } from '../../SocketHandler'
import { useParams } from 'react-router-dom'

import { Droppable } from 'react-beautiful-dnd';
import User from './User'

const OutOfOffice = ({ooo}) => {
    let users = ooo.users.length > 0 ? ooo.users.map((user, i)=> <User index={i} user={user} key={user.uuid}/>) : <h1 className='text-center w-full'>Full House Today</h1>
    return (
        <div className="bg-white px-4 py-2 rounded-lg my-4 opacity-75">
            <h2 className='m-2 text-center'>Out of Office</h2>

            <Droppable droppableId={ooo.uuid} direction='horizontal'>
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

const getPairData = (pairs, pairUuid) => {
    const pair =  pairs.find((p)=> p.uuid === pairUuid)
    const index = pairs.indexOf(pair)
    return {
        pair: pair,
        index: index,
        users: pairs[index].users,
    }
}

const PairGrid = ({pairs, setSaved, setError}) => {
    const { teamId } = useParams()
    const handleError = (response) => {
        if(response.error){ setError(response.message) }
    }

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
        SOCKET.emit('batch update pairs', {pairs: [sourceData, descData], teamId: teamId}, (response) => handleError(response))
    }

    const updatePairInfo = (text, uuid) => {
        const pairData = getPairData(pairs, uuid)
        pairData.pair.info = text
        setSaved(false)
        SOCKET.emit('batch update pairs', {pairs: [pairData], teamId: teamId}, (response) => handleError(response))
    }

    const deletePair = (pair)=> {
        SOCKET.emit('delete pair', {uuid: pair.uuid, teamId: teamId}, (response) => handleError(response))
    }

    const addPair = ()=> {
        SOCKET.emit('add pair', {teamId: teamId}, (response) => handleError(response))
    }

    const activePairs = pairs.filter((p) => p.info !== 'UNPAIRED' && p.info !== 'OUT_OF_OFFICE').map((pair, i) => <Pair updatePairInfo={updatePairInfo} onDelete={deletePair} pair={pair} key={pair.uuid} />)
    const unpaired    = pairs.find((p) => p.info === 'UNPAIRED')
    const ooo         = pairs.find((p) => p.info === 'OUT_OF_OFFICE')

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='col-span-2'>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:grid-rows-3'>
                    { activePairs }
                </div>
                <button onClick={addPair} className='flex items-center m-2'>
                    <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                    <span className='mx-2 text-lg text-gray'>Add Pair</span>
                </button>
            </div>
            <div className="col-span-1">
                { unpaired && <ParkingLot unpaired={unpaired} /> }
                { ooo && <OutOfOffice ooo={ooo} /> }
            </div>
        </DragDropContext>
    )
}

export default PairGrid
