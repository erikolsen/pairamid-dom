import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SQUARE_SIZE = 25

// const User = ({ firstName, avatar }) => {
//     return (
//         <div>
//             <Draggable>
//                 <div className="flex flex-col items-center px-6 py-4">
//                     <img className="h-16 h-24 rounded-full" src={avatar} alt="Woman's Face" />
//                     <p className="text-xl leading-tight">{firstName}</p>
//                 </div>
//             </Draggable>
//         </div>
//     )
// }
const User = ({ firstName, avatar, index }) => {
    return (
        <div>
            <Draggable draggableId={firstName} index={index}>
                {provided => (
                    <div 
                        className="flex flex-col items-center px-6 py-4"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <img className="h-16 h-24 rounded-full" src={avatar} alt="Woman's Face" />
                        <p className="text-xl leading-tight">{firstName}</p>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

const Pair = ({pair}) => {
    let users =  pair.map((user, i)=> <User index={i} firstName={user.firstName} avatar={user.avatar} key={i}/>)
    return (
        <div className="flex max-w-md bg-white shadow-lg rounded-lg m-2">
            <Droppable droppableId={'list-1'}>
                {(provided, snapshot)=> {
                    return(
                        <div ref={provided.innerRef}>
                            {users}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    ) 
}

class DailyView extends Component {

    onDragEnd(result){ 

    }

    render() {
        let today = new Date();
        // let date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`
        let date = today.toDateString()
        return (
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <p className="text-2xl m-2">Pairs for {date}</p>
                    { this.props.pairs.map( (pair, i)=> <Pair pair={pair} key={i} /> ) }
                </DragDropContext>
            </div>
        )
    }
}

export default DailyView