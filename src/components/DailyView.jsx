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

        const sourceData = getPairData(this.state.pairs, source.droppableId)
        const descData = getPairData(this.state.pairs, destination.droppableId)
        const dupPairs = _.cloneDeep(this.state.pairs)
        const sourceClone = _.cloneDeep(sourceData)
        const descClone = _.cloneDeep(descData)

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
            .catch((error) => { 
                dupPairs[sourceClone.index] = sourceClone.pair
                dupPairs[descClone.index] = descClone.pair
                this.setState({pairs: dupPairs, error: error.response.data.message})

            })
    }

    onWorkingChange = (event, uuid) => {
        event.preventDefault()
        const pairData = getPairData(this.state.pairs, uuid)
        const dupPairs = _.cloneDeep(this.state.pairs)
        const pairClone = _.cloneDeep(pairData)
        pairData.pair.info = event.target.value
        this.setState({
            saved: false,
            ...this.state.pairs,
            [pairData.index]: pairData.pair
        })
        axios.put(`${API_URL}/pairing_sessions/batch`, [pairData.pair])
            .then((response) => { this.setState({saved: true})})
            .catch((error) => { 
                dupPairs[pairClone.index] = pairClone.pair
                this.setState({pairs: dupPairs, error: error.response.data.message})
            })
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
            <div>
                <div className='flex justify-between border border-bottom mb-4'>
                    <div className='flex'>
                        <p className="text-2xl my-4 ml-4">Pairs Today</p>
                        <SaveStatus saved={this.state.saved} />
                    </div>
                    <p className="m-4 text-2xl">{getTodaysDate()}</p>
                </div>
                { this.state.error && <ErrorMessage message={this.state.error} /> }
                <div className=''>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { pairs }
                        </DragDropContext>
                    </div>
                    <div className='m-4'>
                        <button onClick={this.addPair} className='flex items-center'>
                            <span className='text-xl text-gray-600'>&#8853;</span>
                            <span className='mx-2 text-lg text-gray-600'>Add Pair</span>
                        </button>
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