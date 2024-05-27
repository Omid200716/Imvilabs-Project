/**
 * @overview
 * Här hanteras mobillayouten strukturerar upp hur det ska visas för mobilen.
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import Navbar from '../components/Navbar';
import ListPanel from '../components/ListPanel';
import Footer from '../components/Footer';
import React from 'react';
import { TfiViewListAlt } from "react-icons/tfi";
import { GoGraph } from "react-icons/go";
import Statistics from './Statistics';

const MobileView = ({userRole, listData, showTestUser, testUser, sessionUser, setChartUser, chartUser, openIndex, chartData, setChartData, setOpenIndex, openTestIndex, setOpenTestIndex, activeComponent, setActiveComponent, tests, showTests, user, showUser, setFirstChartData, firstChartData, setSecondChartData, secondChartData}) => {

    const showComponent = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className='overflow-x-hidden'>
            <div className="md:hidden h-screen flex flex-col">
            <Navbar user={sessionUser}/>
            <div className='h-full flex justify-center bg-slate-50 overflow-y-auto'>
                {activeComponent === 'A' && <ListPanel userRole={userRole} listData={listData} setChartUser={setChartUser} testUser={testUser} setChartData={setChartData} mobile={true} showTestUser={showTestUser} user={user} showUser={showUser} showTests={showTests} tests={tests} setOpenIndex={setOpenIndex} setOpenTestIndex={setOpenTestIndex} openIndex={openIndex} openTestIndex={openTestIndex} showChart={() => setActiveComponent('B')}/>}
                {activeComponent === 'B' && <Statistics chartData={chartData} chartUser={chartUser} testUser={testUser} listData={listData} setFirstChartData={setFirstChartData} setSecondChartData={setSecondChartData} secondChartData={secondChartData} firstChartData={firstChartData} />}
            </div>
         
            <Footer children={(<div className="md:hidden w-full flex items-center justify-around">
                <button onClick={() => showComponent('A')}>{activeComponent === 'A' ? <TfiViewListAlt size={26} />: <TfiViewListAlt className="fill-slate-500" size={26}/>}</button>
                <button onClick={() => showComponent('B')}>{activeComponent === 'B' ? <GoGraph size={30} />: <GoGraph className="fill-slate-500" size={30}/>}</button>
            </div>)}/>
       
            </div>
            {/*<div className='bg-slate-200 hidden sm:block'>
            <div className='flex flex-col h-screen w-screen'>
            <Navbar />
            <div className='flex flex-row  w-full h-full'>
                <div className='min-w-full sm:min-w-[20rem]'>
                    <ListPanel />
                </div>
                    <div className='bg-slate-50 rounded-md flex justify-center items-center w-full h-full mr-2'>
                        <Card>
                            <ChartsPanel className="rounded-md" />
                        </Card>
                    </div>
            </div>
            <Footer />
            </div>
            </div>*/}
        </div>



    );
};

export default MobileView;