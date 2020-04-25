import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { API_URL } from '../constants'
export const SOCKET = io(API_URL);

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Delayed = ({ children, waitBeforeShow = 500 }) => {
    const [isShown, setIsShown] = useState(false);
  
    useEffect(() => {
      let id = setTimeout(() => {
        setIsShown(true);
      }, waitBeforeShow);
      return ()=> { clearTimeout(id) }
    }, [waitBeforeShow]);
  
    return isShown ? children : <div />;
};

const ConnectionLost = ()=> {
    return (
        <Delayed>
            <main className='bg-gray-light col-span-7 p-12 h-screen '>
                <h1 className='text-center p-6  border-4 border-red'>
                    Pairamid hast lost connection to the server. <br />
                    Please try refreshing or contact your system administrator.
                </h1>
            </main>
        </Delayed>
    )
}

const SocketHandler = ({children, requestedData, reset}) => {
    const [connected, setConnected] = useState(true)

    useEffect(() => {
        const handleDisconnect = async (e) => {
            console.log('Pairamid has disconnected.')
            SOCKET.io.off("connect_error")
            setConnected(false)
            for(let i=1; i <= 10; i++){
                await sleep(3000)
                if(SOCKET.disconnected){
                    console.log(`Reconnect attempt: ${i} of 10`)
                } else {
                    console.log('Reconnecting')
                    setConnected(true)
                    reset()
                    break;
                }
            }

            if(SOCKET.disconnected){
                SOCKET.disconnect()
            } else {
                console.log('Connection established.')
            }

        }
        SOCKET.on('disconnect', (e) => { handleDisconnect(e) });
        SOCKET.io.on("connect_error", (e)=> { handleDisconnect() })
        return () => {
            SOCKET.off('disconnect');
        }

    }, [setConnected, reset])

    return (
        connected && requestedData ? children : <ConnectionLost /> 
    )

}
export default SocketHandler;
