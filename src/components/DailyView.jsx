import React, { Component } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import InitialPairs from '../InitialPairs'
import Pair from './Pair'
import PairNames from './PairNames'
import axios from 'axios'
import { API_URL } from '../constants'

const getGetOrdinal = (n) => {
    const s = ["th","st","nd","rd"],
        v=n%100;
    return (s[(v-20)%10]||s[v]||s[0]);
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

class DailyView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pairs: InitialPairs 
        }
    }

    componentDidMount(){
        axios.get(`${API_URL}/pairing_sessions`)
            .then((response) => {
                this.setState({ pairs: response.data })
            })
    }

    savePairs = () => {
        axios.post(`${API_URL}/pairing_sessions`, this.state.pairs)
            .then((response) => {
                console.log('response', response.data)
            })
    }

    onDragEnd = (result) => { 
        const { destination, source, draggableId } = result;
        if(!destination){ return }

        const sourceData = getPairData(this.state.pairs, source.droppableId)
        const descData = getPairData(this.state.pairs, destination.droppableId)
        const descUsers = destination.droppableId === source.droppableId ? sourceData.users : descData.users
        const user = sourceData.users.find((user)=> user.uuid === draggableId)

        sourceData.users.splice(source.index, 1)
        descUsers.splice(destination.index, 0, user)

        this.setState({
            ...this.state.pairs, 
            [sourceData.index]: sourceData.pair,
            [descData.index]: descData.pair,
        });
    }

    onWorkingChange = (event, uuid) => {
        event.preventDefault()
        const pairData = getPairData(this.state.pairs, uuid)
        pairData.pair.info = event.target.value
        this.setState({
            ...this.state.pairs,
            [pairData.index]: pairData.pair
        });
    }

    render() {
        const today = new Date();
        const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        const pairs =  this.state.pairs.map( (pair, i)=> <Pair onChange={this.onWorkingChange} pair={pair} key={pair.uuid} /> ) 
        const pairNames =  this.state.pairs.map((pair)=> <PairNames pair={pair} key={pair.uuid} /> ) 

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
                    <div className='m-2'>
                        <button onClick={this.savePairs} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Save</button>
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