import React, { Component } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import Pair from './Pair'
import PairNames from './PairNames'
import axios from 'axios'
import { API_URL } from '../constants'
import _ from 'lodash'
import io from 'socket.io-client';
const socket = io(API_URL);


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
        return <p className='text-sm text-green font-bold px-2 my-6' >&#10003;</p>
    } else {
        return <p className='text-sm text-black font-bold px-2 my-6' >Saving...</p>
    }
}

const ErrorMessage = ({message}) => {
    return (
        <div className='m-4 bg-red'>
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
        socket.on('add pair', (pair) => {
            this.setState({ pairs: [...this.state.pairs, pair] });
        });
        socket.on('delete pair', (uuid) => {
            this.setState({ pairs: this.state.pairs.filter((p)=> p.uuid !== uuid) });
        });
        socket.on('batch update pairs', (response) => {
            let dupPairs = _.cloneDeep(this.state.pairs)
            response.forEach((data)=> { dupPairs.splice(data.index, 1, data.pair) })
            this.setState({
                saved: true,
                pairs: dupPairs
            })
        });
        axios.get(`${API_URL}/pairing_sessions`)
            .then((response) => {
                this.setState({ pairs: response.data })
            })
    }

    componentWillUnmount(){
        socket.off('add pair');
        socket.off('delete pair');
        socket.off('batch update pairs');
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

        this.setState({saved: false})
        socket.emit('batch update pairs', [sourceData, descData]);
    }

    onWorkingChange = (event, uuid) => {
        event.preventDefault()
        const pairData = getPairData(this.state.pairs, uuid)
        pairData.pair.info = event.target.value
        this.setState({saved: false})
        socket.emit('batch update pairs', [pairData] );
    }

    addPair = ()=> {
        socket.emit('add pair', {});
    }

    deletePair = (pair)=> {
        socket.emit('delete pair', {uuid: pair.uuid});
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
                <div className="">
                    <div className='col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { pairs }
                        </DragDropContext>
                    </div>
                    <button onClick={this.addPair} className='flex items-center m-2'>
                        <span className='text-2xl text-gray leading-tight'>&#8853;</span>
                        <span className='mx-2 text-lg text-gray'>Add Pair</span>
                    </button>
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
