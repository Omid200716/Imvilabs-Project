/**
 * @overview
 * Klassen går ut på att användaren ska välja orginisation.
 * 
 * @origin 
 * - Objektet kan ni modifiera för att lägga till fler orginisationer.
 * - @token är en cookie som lagras som därav avgör vilka användare som ska visas.
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React  from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Origin() {
  const navigate = useNavigate();

  //Här kan fler orginisationer läggas till
  const origin = {
    types: [
    {display: 'All', token: '*'},
    {display: 'IMVILabs', token: 'imvi'},
    {display: 'MapCog', token: 'mapcog'},
    
    ],
    title: "Select user origin"
}
  
   const handleClick = (origin) => {

   
        Cookies.set('origin', origin, '1h');
        navigate('/login');
   }

  return (
    <div>
      <div className='rounded-3xl px-10 py-4 flex flex-col justify-center items-center h-screen bg-white'>

      <h1 className='h-[5rem] flex justify-center items-center'>{origin.title}</h1>

        <div className="w-[20rem] h-[20rem] sm:w-[25rem] overflow-y-scroll">
            {origin.types.map((val, index) => (
            <button key={index} className='h-[5rem] w-full border hover:bg-[gray]' onClick={() => handleClick(val.token.toLowerCase())}>{val.display}</button>
            ))}
        </div>
      </div>
    </div>

  );
}

export default Origin;