import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InitialPairs from '../InitialPairs'

const UserData = ({user}) => {
    return (
        <div className={`w-12 h-12 m-2 border rounded-full bg-${user.team}-400 flex items-center justify-center`}>
            <p className="text-white text-xs">{user.initials}</p>
        </div>
    )
}
const User = ({ id, user, index }) => {
    return (
        <div>
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <UserData user={user} />
                    </div>
                )}
            </Draggable>
        </div>
    )
}

const Pair = ({pair, id, onChange}) => {
    let users =  Object.entries(pair.users).map(([id, user], i)=> <User index={i} id={id} user={user} key={id}/>)
    console.log('Working', pair)
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

const PairNames = ({pair})=> {
    let names = Object.entries(pair.users).map(([id, user]) => `${user.initials}`)
    let working = pair.working ? ' - ' + pair.working : ''
    let pairText = names.length === 1 ? `${names[0]} (solo)` : `${names.join(' & ')}`
    return(
        <li>{pairText} {working}</li>
    )
}

class DailyView extends Component {
    STORAGE_NAME = 'pairamid-data'
    constructor(props) {
        super(props)
        this.state = {
            pairs: {...InitialPairs}
        }
    }

    // componentDidMount(){
    //     let pairs = localStorage.getItem(this.STORAGE_NAME)
    //     if(!!pairs){
    //         return 
    //     } else {
    //         console.log('here')
    //         pairs = {...InitialPairs}
    //         this.setState({pairs})
    //     }
    // }

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
        // localStorage.setItem(this.STORAGE_NAME, this.state)
    }

    onWorkingChange = (event, id) => {
        event.preventDefault()
        let newPair = this.state.pairs[id]
        newPair.working = event.target.value
        this.setState({
            ...this.state.pairs,
            [id]: newPair,
        });
        // localStorage.setItem(this.STORAGE_NAME, this.state)
    }

    render() {
        let today = new Date();
        let date = today.toDateString()
        console.log('state', this.state)
        return (
            <div>
                <p className="text-2xl m-2">Pairs for {date}</p>
                <div className='flex'>
                    <div className=''>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { Object.entries(this.state.pairs).map( ([id, pair])=> <Pair onChange={this.onWorkingChange} id={id} pair={pair} key={id} /> ) }
                        </DragDropContext>
                    </div>
                    <div className='ml-4'>
                        <p className=''>Pairs: </p>
                        <ul className=''>
                            { Object.entries(this.state.pairs).map( ([id, pair])=> <PairNames pair={pair} key={id} /> ) }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyView