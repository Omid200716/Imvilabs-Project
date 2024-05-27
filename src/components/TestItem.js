/**
 * @overview
 * Ett item för testerna som användare kan ha genomfört och visas under ListPanel
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';

const TestItem = ({ name, setChartData, mobile, showChart, index, setOpenTestIndex, testUser, clickedUser, openTestIndex, }) => {
    const [date, setDate] = useState('inget datum');

    useEffect(() => {
        const test = name && (name.dateAdded === null ? "inget datum" : name.dateAdded);
        const timestamp = parseInt(test, 10);
        const dateObject = new Date(timestamp * 1000);
        
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = dateObject.toLocaleTimeString('sv-SE', options);
        
        setDate(formattedDate);
    }, [name]);
    
    return (
        <div className="mb-2 w-[95%]">
            <button
                onClick={() => { setChartData(name); setOpenTestIndex(name.id); clickedUser(testUser); mobile && showChart(true) }}
                className={`${openTestIndex === name.id && "bg-slate-100"} w-full h-14 flex items-center justify-between pl-5 pr-5 hover:bg-slate-100 rounded-md cursor-pointer group relative`}
            >
                <h1 className='font-light text-lg text-slate-900'>{date}</h1>
            </button>
        </div>
    );
};

export default TestItem;