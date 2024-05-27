/**
 * @overview
 * Denna klassen hanterar användar info och laddar in @ChartsPanel
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import ChartsPanel from './ChartsPanel';

const Statistics = ({ chartData, testUser, chartUser, setFirstChartData, firstChartData, secondChartData, setSecondChartData, listData }) => {
    
    const [date, setDate] = useState('inget datum');
    useEffect(() => {
        const test = chartUser && (chartUser.dateAdded === null ? "inget datum" : chartUser.dateAdded);
        const timestamp = parseInt(test, 10);
        const dateObject = new Date(timestamp * 1000);
        
        const options = { day: 'numeric', month: 'long' };
        const formattedDate = dateObject.toLocaleDateString('sv-SE', options);
        
        setDate({formattedDate, year: dateObject.getFullYear()});
    }, [chartUser]);

    const name = chartUser && (chartUser.firstName === '' || chartUser.lastName === '')
        ? 'Okänd Användare'
        : chartUser && `${chartUser.firstName} ${chartUser.lastName}`;

    return (

        <div className={`${chartData && `mt-10`} flex flex-col w-screen sm:w-screen md:w-[95%] lg:w-[40rem] xl:w-[58rem] rounded-md`}>
            {chartUser && <div className=''>
            <h1 className='text-3xl mb-5 text-center md:text-start'>{name}</h1>
        
                <div className='flex justify-between rounded-md mb-5 flex-col sm:flex-row'>
                    
                <div className='min-h-full flex flex-col bg-white w-full sm:w-1/3 my-2 sm:my-0 rounded-md shadow-sm py-4 mr-2 '>
                    
                    <div className='h-full flex justify-center flex-col items-center'>
                    <p className='text-2xl font-bold'>{chartUser && chartUser.age} år</p>
                    <h1 className='text-xs'>Ålder</h1>
                    </div>
                    
                </div>
                <div className='min-h-full flex flex-col bg-white w-full sm:w-1/3 my-2 sm:my-0 rounded-md shadow-sm items-center py-4 mx-2'>
                    
                    <div className='h-full flex justify-center flex-col items-center  text-center'>
                    <p className='font-extrabold'>{date.year}</p>
                    <p className='font-extrabold -mt-2'>{date.formattedDate}</p>
                    
                        <h1 className='text-xs'>Medlem sedan</h1>
                        
                       
                    </div>
                    
                </div>
                <div className='min-h-full flex flex-col bg-white w-full sm:w-1/3 my-2 sm:my-0 rounded-md shadow-sm py-4 ml-2'>
                    
                    <div className='h-full flex justify-center flex-col items-center'>
                    <p className='text-2xl font-bold'>{chartUser && (chartUser.gender === 'm' ? `Man` : chartUser.gender === 'f' ? "Kvinna" : chartUser.gender === 'o' ? "Annat" : "-")}</p>
                        <h1 className='text-xs'>Kön</h1>
                    </div>
                    
                </div>
                
                
                </div>
                </div>}
            <div className={`${!chartData && `flex justify-center`} h-full`}>
                <ChartsPanel chartData={chartData} listData={listData} chartUser={chartUser} testUser={testUser} setFirstChartData={setFirstChartData} setSecondChartData={setSecondChartData} secondChartData={secondChartData} firstChartData={firstChartData} />
            </div>
        </div>

    );
};

export default Statistics;