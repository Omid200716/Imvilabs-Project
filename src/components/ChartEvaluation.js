/**
 * @overview
 * Komponenten representerar resultatet på testet och visualiserar det
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React from 'react';

const ChartEvaluation = ({ percentage, showPercentage }) => {

    return (
        <div className={`flex flex-col items-center justify-center`}>
            <div className={`${showPercentage && 'my-5'} flex flex-col items-center w-[20rem] `}>
                <h1>{showPercentage && percentage + "%"}</h1>
                <div className={`${showPercentage && 'my-2'} w-full flex bg-[#00000004]`}>
                    <div className={`${percentage < 10 && "bg-[#04AA6D] text-white"} w-1/3 text-center  flex flex-col justify-center py-1`}>
                        <h1 className='text-sm font-semibold'>Bra</h1>
                        <h1 className='text-xs'>Under 10%</h1>

                    </div>
                    <div className={`${(percentage > 10 && percentage < 18) && "bg-[#555555] border text-white"} w-1/3 text-center  flex flex-col justify-center py-1`}>
                        <h1 className='text-sm font-semibold'>Gränsvärde</h1>
                        <h1 className='text-xs'>10% - 18%</h1>

                    </div>
                    <div className={`${percentage > 18 && "bg-[#f44336] text-white"} w-1/3 text-center  flex flex-col justify-center py-1`}>
                        <h1 className='text-sm font-semibold'>Avvikande</h1>
                        <h1 className='text-xs'>Över 18%</h1>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartEvaluation;