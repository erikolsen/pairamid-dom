import React from 'react'
import PairNames from './PairNames'

const DailyPairList = ({pairs}) => {
    const displayPairs = pairs.filter((p) => p.info !== 'UNPAIRED' && p.info !== 'OUT_OF_OFFICE')
                    .map((pair)=> <PairNames pair={pair} key={pair.uuid} /> ) 
    return (
        <div className='bg-white shadow-lg rounded-lg p-4 col-span-1 my-4'>
            <h2 className='my-2 border-b border-gray-border'>Pair List</h2>
            <ul className=''>
                { displayPairs }
            </ul>
        </div>
    )
}

export default DailyPairList
