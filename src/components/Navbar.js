/**
 * @overview
 * Navigation som visas vid det översta fältet på sidan
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React from 'react';
import IMVILogo from '../imgs/cropped-imvi-logo.png'
import DropdownMenu from './DropDown';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user}) => {
  const navigate = useNavigate();
  
  return (
    <div className=' h-16 md:h-16 bg-slate-200 flex items-center z-10 justify-between'>
      <button onClick={() => navigate('/')}>
      <img src={IMVILogo} alt='' className='w-8 md:w-10 ml-5 md:ml-14'/></button>
      {user && <DropdownMenu className={"mr-5 md:mr-14"} user={user}/>}
    </div>
  );
};

export default Navbar;