import React, { Component } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import InitialPairs from '../InitialPairs'
import Pair from './Pair'
import PairNames from './PairNames'

class DailyView extends Component {
    STORAGE_NAME = 'pairamid-data'

    constructor(props) {
        super(props)
        this.state = {
            pairs: {...InitialPairs}
        }
    }

    componentDidMount(){
        let pairs = JSON.parse(localStorage.getItem(this.STORAGE_NAME))
        if(pairs){
            this.setState({pairs})
        }
    }

    updateLocal(){
        localStorage.setItem(this.STORAGE_NAME, JSON.stringify(this.state.pairs))
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
        this.updateLocal()
    }

    onWorkingChange = (event, id) => {
        event.preventDefault()
        let newPair = this.state.pairs[id]
        newPair.working = event.target.value
        this.setState({
            ...this.state.pairs,
            [id]: newPair,
        });
        this.updateLocal()
    }

    render() {
        let today = new Date();
        let date = today.toDateString()
        let pairs =  Object.entries(this.state.pairs).map( ([id, pair])=> <Pair onChange={this.onWorkingChange} id={id} pair={pair} key={id} /> ) 
        let pairNames =  Object.entries(this.state.pairs).map( ([id, pair])=> <PairNames pair={pair} key={id} /> ) 

        return (
            <div>
                <p className="text-2xl m-2">Pairs for {date}</p>
                <div className='flex'>
                    <div className=''>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { pairs }
                        </DragDropContext>
                    </div>
                    <div className='ml-4'>
                        <p className=''>Pairs: </p>
                        <ul className=''>
                            { pairNames }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyView