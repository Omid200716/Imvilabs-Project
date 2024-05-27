/**
 * @overview
 * Här är komponenten för användarinfo som visas i @ListPanel
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';

const UserDetails = ({ user }) => {
    
    const [date, setDate] = useState('inget datum');

    useEffect(() => {
       // console.log(user, ' UserDetailsssss sidan');
        const test = user && (user.dateAdded === null ? "inget datum" : user.dateAdded);
        const test2 = user && (user.username === null ? "inget datum" : user.username);
        
      //  console.log(test2, ' users');

        const timestamp = parseInt(test, 10);
        const dateObject = new Date(timestamp * 1000);
        
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = dateObject.toLocaleTimeString('sv-SE', options);
        
        setDate(formattedDate);
    }, [user]);
    return (
        <div className="mb-2 w-[95%]">
            <div className={`w-full h-20 flex flex-col items-center justify-between pl-5 pr-5 rounded-md bg-slate-100 py-3`}>
                <h1 className='text-lg text-slate-900 font-semibold'>Namn</h1>
                <h1 className='font-light text-lg text-slate-900'>{user && user.firstName ? user.firstName : "Uppgifter Saknas"}</h1>
            </div>
            <div className={`w-full h-20 flex flex-col items-center justify-between pl-5 pr-5 rounded-md bg-slate-100 py-3`}>
                <h1 className='text-lg text-slate-900 font-semibold'>Användarnamn</h1>
                <h1 className='font-light text-lg text-slate-900'>{user && user.legPersId ? user.legPersId : "Användarnamn Saknas"}</h1>
               
            </div>
            <div className={`w-full h-20 flex flex-col items-center justify-between pl-5 pr-5 rounded-md bg-slate-100 mt-2 py-3`}>
                <h1 className='text-lg text-slate-900 font-semibold'>Efternamn</h1>
                <h1 className='font-light text-lg text-slate-900'>{user && user.lastName ? user.lastName : "Uppgifter Saknas"}</h1>
            </div>
            <div className={`w-full h-20 flex flex-col items-center justify-between pl-5 pr-5 rounded-md bg-slate-100 mt-2 py-3`}>
                <h1 className='text-lg text-slate-900 font-semibold'>Ålder</h1>
                <h1 className='font-light text-lg text-slate-900'>{user && user.age ? `${user.age} år` : "Ålder Saknas"}</h1>
            </div>
            <div className={`w-full h-20 flex flex-col items-center justify-between pl-5 pr-5 rounded-md bg-slate-100 mt-2 py-3`}>
                <h1 className='text-lg text-slate-900 font-semibold'>Kön</h1>
                <h1 className='font-light text-lg text-slate-900'>{user && (user.gender === 'm' ? `Man` : user.gender === 'f' ? "Kvinna" : "Uppgifter Saknas")}</h1>
            </div>
            <div className={`w-full h-20 flex flex-col items-center justify-between pl-5 pr-5 rounded-md bg-slate-100 mt-2 py-3`}>
                <h1 className='text-lg text-slate-900 font-semibold'>Datum Skapad</h1>
                <h1 className='font-light text-lg text-slate-900'>{date}</h1>
            </div>
            
            
        </div>
    );
};

export default UserDetails;