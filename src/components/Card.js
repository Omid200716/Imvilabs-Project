/**
 * @overview
 * Card komponent
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React from 'react';

const Card = ({children}) => {

  return (
    <div className='shadow-sm rounded-md w-full mb-5'>
      {children}
    </div>
  );
};

export default Card;