/**
 * @fileoverview
 * Här renderas Admin-sidan. Denna del av koden ansvarar för presentationen
 * och funktionaliteten av administrationsgränssnittet i applikationen.
 * 
 * Detta är en del av ett större projekt som helt och hållet har utvecklats av Omid Nikzad.
 * 
 * @author
 * Utvecklad av Omid Nikzad
 * 
 * @version 1.0.0
 * @since Juni 2024
 */

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListPanel from '../components/ListPanel';
import Footer from '../components/Footer';
import MobileView from '../components/MobileView';
import Cookies from 'js-cookie';
import ApiRoutes from '../data-access/index'
import Statistics from '../components/Statistics';


const Admin = () => {
  const [patientData, setPatientData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [openTestIndex, setOpenTestIndex] = useState(null);
  const [activeComponent, setActiveComponent] = useState('A');
  const [tests, showTests] = useState(null);
  const [user, showUser] = useState(null);
  const [testUser, showTestUser] = useState(null);
  const [firstChartData, setFirstChartData] = useState(null);
  const [secondChartData, setSecondChartData] = useState(null);
  const [chartUser, setChartUser] = useState(null);

  const sessionUser = Cookies.get('session_user');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const fetchedData = await ApiRoutes.getPatientCredentials();
        // console.log(fetchedData, 'admin sidan ');

        setPatientData(fetchedData);
      } catch (error) {
        console.error('Felet:', error);
        throw error;
      }
    };


    fetchData();

  }, []);


  return (

    <div className='bg-slate-200'>
      <MobileView userRole="admin" sessionUser={sessionUser} chartUser={chartUser} testUser={testUser} setChartUser={setChartUser} showTestUser={showTestUser} listData={patientData} chartData={chartData} setChartData={setChartData} setFirstChartData={setFirstChartData} setSecondChartData={setSecondChartData} secondChartData={secondChartData} firstChartData={firstChartData} setActiveComponent={setActiveComponent} user={user} showUser={showUser} showTests={showTests} tests={tests} activeComponent={activeComponent} setOpenIndex={setOpenIndex} setOpenTestIndex={setOpenTestIndex} openIndex={openIndex} openTestIndex={openTestIndex} />
      <div className='flex-col h-screen w-screen hidden md:flex'>
        <Navbar user={'Admin'} />
        <div className='flex flex-row w-full h-full overflow-hidden'>
          <div className='min-w-full sm:min-w-[20rem]'>
            <ListPanel userRole="imvi" listData={patientData} setChartUser={setChartUser} testUser={testUser} setChartData={setChartData} mobile={false} showTestUser={showTestUser} user={user} showUser={showUser} showTests={showTests} tests={tests} setOpenIndex={setOpenIndex} setOpenTestIndex={setOpenTestIndex} openIndex={openIndex} openTestIndex={openTestIndex} />

          </div>


          <div className='bg-slate-50 rounded-md flex justify-center w-full h-full mr-2 overflow-y-auto'>
            <Statistics chartData={chartData} listData={patientData} chartUser={chartUser} testUser={testUser} setFirstChartData={setFirstChartData} setSecondChartData={setSecondChartData} secondChartData={secondChartData} firstChartData={firstChartData} className="rounded-md" />
          </div>

        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;