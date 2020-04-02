import React, { Component } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import InitialPairs from '../InitialPairs'
import Pair from './Pair'
import PairNames from './PairNames'
import axios from 'axios'
import { API_URL } from '../constants'


const getTodaysDate = () => {
    const today = new Date();
    const dateFormatOptions = {
        month: 'long',
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', dateFormatOptions).format(today);
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

const SaveButton = ({saved, onSave}) => {
    if (saved){
        return <p className='text-sm border-solid border-2 border-white text-green-500 font-bold py-2 px-4 rounded m-4' >Saved!</p>
    } else {
        return <button onClick={onSave} className='text-sm hover:bg-blue-600 hover:text-white border-solid border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded m-4' >Save</button>
    }
}

class DailyView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pairs: InitialPairs,
            saved: false
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
                this.setState({ saved: true })
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
            saved: false,
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
            saved: false,
            ...this.state.pairs,
            [pairData.index]: pairData.pair
        });
    }

    render() {
        const pairs =  this.state.pairs.map( (pair, i)=> <Pair onChange={this.onWorkingChange} pair={pair} key={pair.uuid} /> ) 
        const pairNames =  this.state.pairs.map((pair)=> <PairNames pair={pair} key={pair.uuid} /> ) 

        return (
            <div>
                <div className='flex justify-between border border-bottom mb-4'>
                    <div className='flex'>
                        <p className="text-2xl m-4">Pairs Today</p>
                        <SaveButton onSave={this.savePairs} saved={this.state.saved} />
                    </div>
                    <p className="m-4 text-2xl">{getTodaysDate()}</p>
                </div>
                <div className=''>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { pairs }
                        </DragDropContext>
                    </div>
                    <div className='m-2'>
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