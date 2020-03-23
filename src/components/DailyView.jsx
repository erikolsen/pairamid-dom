import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InitialPairs from '../InitialPairs'

const User = ({ id, user, index }) => {
    return (
        <div>
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div 
                        className="flex flex-col items-center px-2 py-2"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <img className="h-12 h-12 rounded-full" src={user.avatar} alt='user icon' title={`${user.firstName} ${user.lastName}`}/>
                        <p className="leading-tight">{user.firstName[0] + user.lastName[0]}</p>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

const Pair = ({pair, id}) => {
    console.log('in pair', pair)
    let users =  Object.entries(pair.users).map(([id, user], i)=> <User index={i} id={id} user={user} key={id}/>)
    return (
        <div className="bg-white shadow-lg rounded-lg m-2 max-w-xs">
            <Droppable droppableId={id} direction='horizontal'>
                {(provided, snapshot)=> {
                    return(
                        <div 
                            className="flex flex-row"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {users}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

const PairNames = ({pair})=> {
    let names = Object.entries(pair.users).map(([id, user]) => `${user.firstName} ${user.lastName}`)
    return (
        <li>{names.join(' & ')}</li>
    )
}

class DailyView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pairs: { ...InitialPairs } 
        }
        console.log('in const', this.state.pairs)
    }

    onDragEnd = (result) => { 
        const { destination, source, draggableId } = result;
        if(!destination || destination.droppableId === source.droppableId){ return }

        const descUsers = this.state.pairs[destination.droppableId].users
        const sourceUsers = this.state.pairs[source.droppableId].users

        descUsers[draggableId] = sourceUsers[draggableId]
        delete sourceUsers[draggableId]

        this.setState({
        ...this.state.pairs,
        [source.droppableId]: {
            users: sourceUsers 
        },
        [destination.droppableId]: {
            users: descUsers
        }
        });
    }

    render() {
        console.log('in Render', this.state.pairs)
        let today = new Date();
        // let date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`
        let date = today.toDateString()
        return (
            <div>
                <p className="text-2xl m-2">Pairs for {date}</p>
                <div className='flex'>
                    <div>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { Object.entries(this.state.pairs).map( ([id, pair])=> <Pair id={id} pair={pair} key={id} /> ) }
                        </DragDropContext>
                        <ul className='m-2'>
                            { Object.entries(this.state.pairs).map( ([id, pair])=> <PairNames pair={pair} key={id} /> ) }
                        </ul>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyView