import React, { Component } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import InitialPairs from '../InitialPairs'
import Pair from './Pair'
import PairNames from './PairNames'

function getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
    return (s[(v-20)%10]||s[v]||s[0]);
 }

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
        var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        let pairs =  Object.entries(this.state.pairs).map( ([id, pair])=> <Pair onChange={this.onWorkingChange} id={id} pair={pair} key={id} /> ) 
        let pairNames =  Object.entries(this.state.pairs).map( ([id, pair])=> <PairNames pair={pair} key={id} /> ) 

        return (
            <div>
                <div className='flex justify-between border border-bottom mb-4'>
                    <p className="text-2xl m-4">Pairs Today</p>
                    <p className="text-2xl m-4"><span className='font-bold'>{days[today.getDay()]}</span>, <span className='text-gray-600'>{today.getDate()}<sup>{getGetOrdinal(today.getDate())}</sup></span></p>
                </div>
                <div className=''>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
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