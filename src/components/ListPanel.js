/**
 * @overview
 * Här är panelen som hanterar personlista, testlista, användaregenskaper
 * 
 * @author Ytterligare utveckling och anpassningar av Omid Nikzad.
 * Ursprungliga klasser och komponenter av Viktor Johansson.
 * 
 * @version 1.0.0
 * @since November, 2023
 * @updated Juni, 2024
 */


import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { getTestsFromPatientID } from '../api/Chart';
import { MdKeyboardReturn } from 'react-icons/md';
import TestItem from './TestItem';
import BeatLoader from 'react-spinners/BeatLoader';
import UserDetails from './UserDetails';
import ApiRoutes from '../data-access/index'
import Cookies from 'js-cookie';

const ListPanel = ({ userRole, legPersData, listData, setChartData, testUser, setChartUser, showTestUser, mobile, showChart, openIndex, setOpenIndex, openTestIndex, setOpenTestIndex, tests, showTests, user, showUser, }) => {
  let patientsData = listData && listData.patients;
  const testData = listData && listData.tests;


  const [searchInput, setSearchInput] = useState('');
  const [patientUsernames, setPatientUsernames] = useState([]);

  const loggedUser = Cookies.get('session_user');

  useEffect(() => {
    const sortedPatients = () => {

      if (patientsData) {
        patientsData = patientsData.slice().sort((a, b) => {
          const testsA = getTestsFromPatientID(testData, a.patientId).length || 0;
          const testsB = getTestsFromPatientID(testData, b.patientId).length || 0;
          return testsB - testsA;
        });

        patientsData = patientsData.filter(patient => {
          return patient.origin ? (Cookies.get('origin') === '*' ? patient : patient.origin.toLowerCase() === Cookies.get('origin')) : Cookies.get('origin') === '*' && patient;
        });
      }
    }

    sortedPatients();
  }, [])

  const filteredPatients = () => patientUsernames.filter(patient =>
    patient.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  const test = showTestUser;

  useEffect(() => {
    async function fetchLegPersData() {
      try {
        const data = await ApiRoutes.getLegPersData();
        setPatientUsernames(data);

        if (loggedUser !== undefined && loggedUser !== "" && loggedUser !== "admin") {
          //console.log('data: ', data);
          const loggedUsername = data.filter(patient =>
            patient.username === loggedUser
          );
          // console.log('loggedUsername: ', loggedUsername);
          setPatientUsernames(loggedUsername);
        }

      } catch (error) {
        console.error('Ett fel uppstod vid hämtning av legpers-data', error);
      }
    }
    fetchLegPersData();
  }, []);

  useEffect(() => {
    if (openTestIndex) showTestUser = { test };
  }, [openTestIndex]);

  const name = testUser && (testUser.firstName === '' || testUser.lastName === '')
    ? 'Okänd Användare'
    : testUser && `${testUser.firstName} ${testUser.lastName}`;

  return (
    <div className='bg-slate-200 w-full h-full flex flex-col justify-center items-center rounded-md max-h-screen'>
      {!tests && loggedUser === "admin" && !user && (
        <div className='w-[95%] rounded-tl-md rounded-tr-md bg-slate-300 flex flex-col align-items-center'>
          <input
            type="text"
            placeholder="Sök"
            value={searchInput}
            onChange={(e) =>
              onSearch(e.target.value)
            }
            className="w-[100%] p-1 my-2 border border-gray-400 rounded bg-slate-100"
          />
          <div style={{ textAlign: 'center', width: '100%', color: '#333', fontSize: '16px', marginBottom: '20px' }}>
            Loggar in som <span style={{ fontWeight: 'bold' }}>{loggedUser}</span>
          </div>

        </div>)}
      {tests && (
        <div className='w-[95%] rounded-tl-md rounded-tr-md bg-slate-300 pl-5 pt-5'>
          <h1 className='text-center pb-2'>{name}</h1>
          <button onClick={() => showTests(null)}>
            <MdKeyboardReturn size={20} />
          </button>
        </div>
      )}
      {user && (
        <div className='w-[95%] rounded-tl-md rounded-tr-md bg-slate-300 pl-5 pt-5'>
          <button onClick={() => showUser(null)}>
            <MdKeyboardReturn size={20} />
          </button>
        </div>
      )}
      <div className={`bg-slate-300 w-[95%] h-full rounded-bl-md rounded-br-md flex flex-col overflow-y-scroll pt-2`}>
        {!tests && !user && patientsData ? (
          <>
            {searchInput.length > 0 ? (
              filteredPatients() && filteredPatients().map((elem, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <ListItem
                    patient={elem}
                    patientList={filteredPatients}
                    patientsListData={patientsData}
                    index={index}
                    numOfTests={getTestsFromPatientID(testData, elem.patientId).length}
                    showTests={showTests}
                    showUser={showUser}
                    setOpenIndex={setOpenIndex}
                    openIndex={openIndex}
                    showTestUser={test}
                    userRole={userRole}
                    legPersData={legPersData}
                  />
                </div>
              ))
            ) : (
              patientUsernames.map((elem, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <ListItem
                    patient={elem}
                    patientList={patientUsernames}
                    patientsListData={patientsData}
                    index={index}
                    numOfTests={getTestsFromPatientID(testData, elem.patientId).length}
                    showTests={showTests}
                    showUser={showUser}
                    setOpenIndex={setOpenIndex}
                    openIndex={openIndex}
                    showTestUser={test}
                    userRole={userRole}
                    legPersData={legPersData}
                  />
                </div>
              ))
            )}
          </>
        ) : (
          <div className='h-full'>
            {tests && testData ? (
              getTestsFromPatientID(testData, tests.patientId).map((elem, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <TestItem name={elem} testUser={testUser} clickedUser={setChartUser} setChartData={setChartData} mobile={mobile} index={index} showChart={showChart} setOpenTestIndex={setOpenTestIndex} openTestIndex={openTestIndex}></TestItem>
                </div>
              ))
            ) : user ? (
              <div className='flex flex-col items-center'>
                <UserDetails user={user} />
              </div>
            ) : (
              <div className='h-full w-full flex justify-center items-center'><BeatLoader className="mb-10" color="#000" /></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPanel;