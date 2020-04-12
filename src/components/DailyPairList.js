import React from 'react'
import PairNames from './PairNames'

const DailyPairList = ({pairs}) => {
    return (
        <div className='col-span-2 m-2'>
            <h2>Daily Pair List</h2>
            <ul className=''>
                { pairs.map((pair)=> <PairNames pair={pair} key={pair.uuid} /> ) }
            </ul>
        </div>
    )
}

export default DailyPairList
