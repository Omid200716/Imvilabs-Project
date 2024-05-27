/**
 * @overview
 * Itemet som visas bland datan som kan exporteras för personers resultat
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import ChartEvaluation from './ChartEvaluation';

const UserDataTestItem = ({ index, test, percentage }) => {
    const [date, setDate] = useState('inget datum');

    useEffect(() => {
        const testdate = test && (test.dateAdded === null ? "inget datum" : test.dateAdded);
        const timestamp = parseInt(testdate, 10);
        const dateObject = new Date(timestamp * 1000);

        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = dateObject.toLocaleTimeString('sv-SE', options);

        setDate(formattedDate);
    }, [test && test.dateAdded]);

    return (
        <>
            {test && <div className={`flex w-full flex-col justify-between items-center py-5 px-2 ${index % 2 === 0 && 'bg-slate-100'}`}>
                {test && <h1 className=''>{date}</h1>}
                {test && <h1 className='text-end'>≈ {percentage && isNaN(percentage) ? "0.0%" : percentage + "%"}</h1>}
                {test && <ChartEvaluation percentage={percentage && percentage} />}
            </div>}
        </>
    );
};

export default UserDataTestItem;