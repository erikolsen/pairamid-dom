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
            pairs: InitialPairs 
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
        if(!destination){ return }

        const sourcePair = this.state.pairs.find((pair)=> pair.uuid === source.droppableId)
        const descPair = this.state.pairs.find((pair)=> pair.uuid === destination.droppableId)

        const sourceIndex = this.state.pairs.indexOf(sourcePair) 
        const descIndex = this.state.pairs.indexOf(descPair)

        const sourceUsers = this.state.pairs[sourceIndex].users 
        const descUsers = destination.droppableId === source.droppableId ? sourceUsers : this.state.pairs[descIndex].users

        let user = sourceUsers.find((user)=> user.uuid === draggableId)
        let pairsClone = this.state.pairs

        sourceUsers.splice(source.index, 1)
        descUsers.splice(destination.index, 0, user)
        pairsClone[descIndex] = descPair
        pairsClone[sourceIndex] = sourcePair
        this.setState({
            pairs: pairsClone
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
        let pairs =  this.state.pairs.map( (pair)=> <Pair onChange={this.onWorkingChange} pair={pair} key={pair.uuid} /> ) 
        let pairNames =  this.state.pairs.map((pair)=> <PairNames pair={pair} key={pair.uuid} /> ) 

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