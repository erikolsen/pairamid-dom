import React, { useState, useEffect } from 'react'
import PairGrid from './PairGrid'
import DailyPairList from './DailyPairList'
import DailyPairHeader from './DailyPairHeader'
import axios from 'axios'
import { API_URL } from '../constants'
import _ from 'lodash'
import io from 'socket.io-client';

export const socket = io(API_URL);

const DailyView = () => {
    const [pairs, setPairs] = useState(null)
    const [saved, setSaved] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=> {
        axios.get(`${API_URL}/pairing_sessions`)
            .then((response)=> {
                setPairs(response.data)
            })
    }, [])

    useEffect(()=> {
        socket.on('server error', (e) => { setError(e.message) } );
        socket.on('add pair', (pair) => { setPairs([...pairs, pair]) });
        socket.on('delete pair', (uuid) => { setPairs(pairs.filter((p)=> p.uuid !== uuid)) });
        socket.on('batch update pairs', (response) => {
            let dupPairs = _.cloneDeep(pairs)
            response.forEach((data)=> { dupPairs.splice(data.index, 1, data.pair) })
            setPairs(dupPairs)
            setSaved(true)
        });

        return ()=> {
            socket.off('server error');
            socket.off('add pair');
            socket.off('delete pair');
            socket.off('batch update pairs');
        }
    }, [pairs])

    console.log('Pairs', pairs)

    return (
        <section>
            <DailyPairHeader saved={saved} error={error} />
            {pairs && <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
                <PairGrid pairs={pairs} setSaved={setSaved} setError={setError} /> 
                <DailyPairList pairs={pairs} /> 
            </div>}
        </section>
    )
}

export default DailyView
