/**
 * @overview
 * Footer
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useState } from 'react';

const Footer = ({children}) => {
    const [activeComponent, setActiveComponent] = useState('A');

    const showComponent = (component) => {
        setActiveComponent(component);
    };

    return (  
        <div className='min-w-[18rem] bg-slate-200 flex items-center h-24 md:h-12 justify-around'>
            {children !== null ? children : {}}
        </div>
    );
};

export default Footer;