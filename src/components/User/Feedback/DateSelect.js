import React, { useState } from 'react'
import Calendar from 'react-calendar'

const localDate = date => date ? date.toLocaleDateString('en-US') : ''
const spanOfDays = (d1, d2) => (localDate(d1) !== localDate(d2))
const DateSelect =  ({date, setDate}) => {
    const [rangeSelect, setRangeSelect] = useState(false)
    const [startDate, endDate] = date
    return (
        <div>
            <p className='flex justify-center items-center font-bold text-center text-lg my-2'>
                Filtering Dates <span className='ml-2'>{localDate(startDate)}</span>
                {spanOfDays(startDate, endDate) && <span>-{localDate(endDate)}</span>}
            </p>
            <div className='flex justify-center'>
                <Calendar 
                    className='p-2'
                    calendarType='US'
                    onChange={(e)=> setDate(e)} 
                    selectRange={rangeSelect}
                    returnValue='range'
                    value={date}
                />
            </div>
            <label className="flex mt-4">
                <div className="bg-white border-2 rounded border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    <input onClick={()=> setRangeSelect(!rangeSelect)} type="checkbox" className="opacity-0 absolute" name='repeatWeekly' />
                    <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                </div>
                <div className="select-none">Select Range</div>
            </label>
            { rangeSelect && <p className='text-center my-4'>First click will select start date. Second click will select end date. Third click will set a new start date.</p> }
        </div>
    )
}

export default DateSelect
