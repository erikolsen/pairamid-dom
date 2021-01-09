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

const DailyPairHeader = ({saved, error}) => {
    return (
        <div>
            <header className='border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4'>
                <div className='flex items-center'>
                    <h1>Today's Pairs</h1>
                    <SaveStatus saved={saved} />
                </div>
                <p className="font-normal text-teal-dark text-xl">{getTodaysDate()}</p>
            </header>
            { error && <ErrorMessage message={error} /> }
        </div>
    )
}

export default DailyPairHeader
