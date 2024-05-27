/**
 * @overview
 * Här laddas signin sidan in
 * 
 * @author Viktor Johansson
 * @website
 * @version 1.0.0
 * @since November, 2023
 */

import React from 'react';
import AuthForm from '../components/AuthForm';
import Navbar from '../components/Navbar';

const Signin = () => {

 
  return (
    
    <div className='h-screen flex flex-col'>
        <Navbar user={null}/>
        <AuthForm authMode={"signin"}/>
        
    </div>
  );
};

export default Signin;