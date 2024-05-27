/**
 * @overview
 * ANVÄNDS INTE
 * Detta är en klass som skulle hantera att byta sida bland resultaten
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const ResultPageSelect = ({result,setSelectedIndex, selectedIndex }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visiblePages, setVisiblePages] = useState([]);

    useEffect(() => {
        const calculateVisiblePages = () => {
            const newVisiblePages = [];
            for (let i = (5 * currentPage) - 5; i < Math.min(5 * currentPage, (result.length / 2)); i++) {
                newVisiblePages.push(i + 1);
            }
            setVisiblePages(newVisiblePages);
        };
        calculateVisiblePages();
    }, [currentPage]);


    const handlePageSelect = (event) => {
        const button = event.target.textContent;
        setSelectedIndex((parseInt(button)-1));
    }

    return (
        <div className='flex flex-col items-center justify-center w-full'>
        <div className='flex flex-col items-center justify-center w-[15rem]'>
            <div className='w-full flex items-center justify-center my-5'>
                <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                    <MdKeyboardDoubleArrowLeft />
                </button>
                {visiblePages.map((item, index) => (
                    <div key={item} className={`w-7 flex justify-between py-1`}>
                        <button onClick={handlePageSelect} className={`${(selectedIndex+1) == item && 'underline'} text-sm text-center w-full`}>{item}</button>
                    </div>
                ))}
                {result.length > 5 && (<div className={`w-7 text-center py-1`}>
                    <button onClick={() => currentPage < Math.ceil(result.length / 5) && setCurrentPage(currentPage + 1)}>...</button>
                </div>)}
                <button onClick={() => {currentPage < Math.ceil(result.length / 5) && setCurrentPage(currentPage + 1);}}>
                    <MdKeyboardDoubleArrowRight />
                </button>
            </div>
        </div>
    </div>
    );
};

export default ResultPageSelect;