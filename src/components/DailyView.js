import React, { useState, useEffect } from 'react'
import PairGrid from './PairGrid'
import DailyPairList from './DailyPairList'
import DailyPairHeader from './DailyPairHeader'
import _ from 'lodash'
import { SOCKET } from './SocketHandler'

const DailyView = ({pairs, setPairs}) => {
    const [saved, setSaved] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=> {
        SOCKET.on('server error', (e) => { setError(e.message) } );
        SOCKET.on('add pair', (pair) => { setPairs([...pairs, pair]) });
        SOCKET.on('delete pair', (uuid) => { setPairs(pairs.filter((p)=> p.uuid !== uuid)) });
        SOCKET.on('batch update pairs', (response) => {
            let dupPairs = _.cloneDeep(pairs)
            response.forEach((data)=> { dupPairs.splice(data.index, 1, data.pair) })
            setPairs(dupPairs)
            setSaved(true)
        });

        return ()=> {
            SOCKET.off('server error');
            SOCKET.off('add pair');
            SOCKET.off('delete pair');
            SOCKET.off('batch update pairs');
        }

    }, [pairs, setPairs])

    return (
        <main className="bg-gray-light col-span-7 p-12 h-full">
            <section>
                <DailyPairHeader saved={saved} error={error} />
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
                    <PairGrid pairs={pairs} setSaved={setSaved} setError={setError} /> 
                    <DailyPairList pairs={pairs} /> 
                </div>
            </section>
        </main>
    )
}

export default DailyView
