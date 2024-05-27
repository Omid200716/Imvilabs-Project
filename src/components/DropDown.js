/**
 * @overview
 * Här är dropdown komponenten som hanterar användare actions
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useState } from 'react';
import { signout } from '../api';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({user, className}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function signoutUser() {
    signout();
    navigate('/origin');
  }

  return (
    <div className={`${className} relative inline-block text-left w-28 md:w-40`}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full rounded-md border-gray-300 px-4 py-2 bg-slate-100 text-sm font-medium text-gray-700 focus:outline-none  active:text-gray-800 overflow-ellipsis overflow-hidden"
        >
          <p className='w-32 overflow-hidden overflow-ellipsis'>{user && user}</p>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 w-full shadow-lg bg-slate-50 ring-1 ring-black ring-opacity-5">
          <div className="">
            <button
              onClick={signoutUser}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logga ut
            </button>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;