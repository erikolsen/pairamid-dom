/* eslint-disable react/no-unescaped-entities */
import React from 'react'

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

const SaveStatus = ({saved}) => {
    if (saved){
        return <p className='text-sm text-green font-bold px-2' >&#10003;</p>
    } else {
        return <p className='text-sm text-black font-bold px-2' >Saving...</p>
    }
}

const ErrorMessage = ({message}) => {
    return (
        <div className='m-4 bg-red'>
            <p className='text-bold p-2'>
                { `${message} - Please refresh your browser and try again.` }
            </p>
        </div>
    )
}

const DailyPairHeader = ({saved, error, team}) => {
    return (
        <div>
            <p className='text-2xl font-bold'>{team.name}</p>
            <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline mb-4'>
                <div className='flex items-center'>
                    <p className='text-xl'>Today's Pairs</p>
                    <SaveStatus saved={saved} />
                </div>
                <p className="font-normal text-teal-dark text-xl">{getTodaysDate()}</p>
            </header>
            { error && <ErrorMessage message={error} /> }
        </div>
    )
}

export default DailyPairHeader
