import React, { Component } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import Pair from './Pair'
import PairNames from './PairNames'
import axios from 'axios'
import { API_URL } from '../constants'
import _ from 'lodash'


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

const SaveStatus = ({saved}) => {
    if (saved){
        return <p className='text-sm text-green-500 font-bold px-2 my-6' >&#10003;</p>
    } else {
        return <p className='text-sm text-black font-bold px-2 my-6' >Saving...</p>
    }
}

const ErrorMessage = ({message}) => {
    return (
        <div className='m-4 bg-red-200'>
            <p className='text-bold p-2'>{message}</p>
        </div>
    )
}

class DailyView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pairs: [],
            saved: true,
            error: ''
        }
    }

    componentDidMount(){
        axios.get(`${API_URL}/pairing_sessions`)
            .then((response) => {
                this.setState({ pairs: response.data })
            })
    }

    onDragEnd = (result) => { 
        const { destination, source, draggableId } = result;
        if(!destination){ return }
        const dupPairs = _.cloneDeep(this.state.pairs)
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
        })
        axios.put(`${API_URL}/pairing_sessions/batch`, [sourceData.pair, descData.pair])
            .then((response) => { this.setState({saved: true})})
            .catch((error) => { this.setState({pairs: dupPairs, error: error.response.data.message}) })
    }

    onWorkingChange = (event, uuid) => {
        event.preventDefault()
        const pairData = getPairData(this.state.pairs, uuid)
        const dupPairs = _.cloneDeep(this.state.pairs)
        pairData.pair.info = event.target.value
        this.setState({
            saved: false,
            ...this.state.pairs,
            [pairData.index]: pairData.pair
        })
        axios.put(`${API_URL}/pairing_sessions/batch`, [pairData.pair])
            .then((response) => { this.setState({saved: true})})
            .catch((error) => { this.setState({pairs: dupPairs, error: error.response.data.message}) })
    }

    addPair = ()=> {
        axios.post(`${API_URL}/pairing_sessions`)
            .then((response) => {
                this.setState({ 
                    pairs: [...this.state.pairs, response.data] 
                });
            })
    }

    deletePair = (pair)=> {
        axios.delete(`${API_URL}/pairing_sessions/${pair.uuid}`)
            .then((response) => {
                this.setState({ 
                    pairs: this.state.pairs.filter((p)=> p.uuid !== pair.uuid)
                });
            })
    }

    render() {
        const pairs =  this.state.pairs.map( (pair, i)=> <Pair onChange={this.onWorkingChange} onDelete={this.deletePair} pair={pair} key={pair.uuid} /> ) 
        const pairNames =  this.state.pairs.map((pair)=> <PairNames pair={pair} key={pair.uuid} /> ) 

        return (
            <section>
                <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                    <div className='flex items-center'>
                        <h1>Today's Pairs</h1>
                        <SaveStatus saved={this.state.saved} />
                    </div>
                    <p className="font-normal text-teal-dark text-xl">{getTodaysDate()}</p>
                </header>

                { this.state.error && <ErrorMessage message={this.state.error} /> }
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className='col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { pairs }
                        </DragDropContext>
                        <button onClick={this.addPair} className='flex items-center'>
                            <span className='text-xl text-gray-600'>&#8853;</span>
                            <span className='mx-2 text-lg text-gray-600'>Add Pair</span>
                        </button>
                    </div>
                    <div className='col-span-2 m-2'>
                        <h2>Daily Pair List</h2>
                        <ul className=''>
                            { pairNames }
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default DailyView
