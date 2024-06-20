/**
 * @overview
 * Klassen representerar alla knappar med användare i listan
 * 
 * @author Ytterligare utveckling och anpassningar av Omid Nikzad.
 * Ursprungliga klasser och komponenter av Viktor Johansson
 * 
 * @version 1.0.0
 * @since November, 2023
 * @updated Juni, 2024
 */


import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaArrowRight, FaXmark } from "react-icons/fa6";
import ApiRoutes from '../data-access';
import Cookies from 'js-cookie';


const ListItem = ({ userRole, patient,showTests, patientsListData, index, numOfTests, showUser, setOpenIndex, openIndex, showTestUser }) => {
  const [height, setHeight] = useState(openIndex === index ? 'h-20' : 'h-8');
  const [legPersData, setLegPersData] = useState(null); 
  const [childrenList, setChildrenList] = useState([]); 
  const [searchInput, setSearchInput] = useState('');

  
  const logindefs = useMemo(() => legPersData ? legPersData.map(user => user.logindef) : [], [legPersData]);
  const loggedUser = Cookies.get('session_user');

  const getChildren = () => {
    const children = patientsListData.filter(patient => patient.legPersId === userLegPersId);
    setChildrenList(children);
  }

  useEffect(() => {
    async function fetchLegPersData() {
      try {
        const data = await ApiRoutes.getLegPersData();
        setLegPersData(data);
      } catch (error) {
        console.error('Ett fel uppstod vid hämtning av legpers-data', error);
      }
    }
    fetchLegPersData();
    if (loggedUser !== "" && loggedUser !== undefined && loggedUser !== "admin") {
      handleItemClick();
      setHeight('h-28');
    }
  }, []);

  useEffect(() => {
    getChildren();
  }, [logindefs]); 


  const userLegPersId = patient && (patient.username === '' || patient.username === undefined)
    ? 'Okänd ID'
    : patient.username;
  // console.log(userLegPersId, 'legPersId ListItem');
  const name =
    patient && (patient.firstName === '' || patient.lastName === '')
      ? 'Okänd Användare'
      : `${patient.firstName} ${patient.lastName} `;


  const ref = useRef();
  const toggleContent = () => {
    setHeight('h-28');
    handleItemClick();
  };



  const item = (
    <button
    onClick={toggleContent}
    className={`w-full ${height} flex items-center justify-between p-0 m-0 hover:bg-slate-100 rounded-md cursor-pointer group relative`}
  >
    <React.Fragment>
      {userRole? (
        <>
          <h1 className='font-light text-sm text-slate-900' style={{ fontWeight: 'bold', marginRight: '0', marginLeft: '0' }}>{userLegPersId}</h1>
        </>
      ) : (
        <>
          <h1 className='font-light text-bold text-lg text-slate-900' style={{  marginRight: '0', marginLeft: '0'}}>{userLegPersId}</h1> 
          <h1 style={{ marginRight: '0', marginLeft: '0' }}>{childrenList.length} st registrerade</h1>
        </>
      )}
    </React.Fragment>
  </button>
  
  );
  const ButtonComp = ({ comp, onClick, className }) => (
    <button
      onClick={onClick}
      className={`${className} py-0 px-0 hover:bg-slate-300 h-full flex gap-0 cursor-pointer`}
    >
      {comp}
    </button>
  );

  const handleItemClick = (index) => {
    setOpenIndex(index);
    getChildren();
  };

  const onSearch = (value) => {
    setSearchInput(value);
    const filteredChildren = childrenList.filter(child =>
      `${child.firstName} ${child.lastName}`.toLowerCase().includes(value.toLowerCase())
    );
    setChildrenList(filteredChildren);
  };

  const itemClicked = (
    <div
      onClick={() => handleItemClick(index)}
      className={`w-full ${height} bg-white h-fit flex flex-col justify-between pt-[0.85rem] pb-[0.85rem] items-start pl-5 pr-5 rounded-md cursor-default group relative`}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className="flex justify-end hover: text-red-600">
          <FaXmark onClick={() => { setHeight('h-10'); }} />
        </div>

        <div className='flex justify-between w-full'>
          <h1 className='font-light text-lg text-slate-900'>{userLegPersId}</h1>
          <h1>{childrenList.length} St</h1>
        </div>

        <div className='w-[100%] '>
          <input
            type="text"
            placeholder="Sök"
            value={searchInput}
            onChange={(e) =>
              onSearch(e.target.value)
            }
            className="w-[100%] p-1 my-2 border border-gray-400 rounded bg-slate-100"
          />
          
        </div>

      </div>
      <div className='w-full flex flex-col bg-slate-200 h-fit min-w-[5.2rem] mt-2'>
        {
          childrenList.length === 0 ?
            (
              <div className='w-full flex justify-center items-center h-full'>Inga registrerade</div>
            )
            :
            (
              childrenList.map((child, index) => (
                <div key={index} className='w-full flex items-center h-full px-2 py-2 hover:bg-slate-200'>
                  <ButtonComp
                    className='w-full'
                    onClick={() => {
                      showUser(child);
                    }}
                    comp={<span className='flex justify-around items-center'>{child.firstName} {child.lastName}</span>}
                  />

                  <ButtonComp
                    className={`${numOfTests < 1 && 'bg-red-100 hover:bg-red-100 cursor-default w-fit'}`}
                    onClick={() => { showTests(child); showTestUser(child); }}
                    comp={<span className={` flex justify-around items-center h-full`}><FaArrowRight /></span>}
                  />
                </div>
              ))
            )
        }
      </div>
    </div>
  );

  return (
    <div className="mb-2 w-[95%] " ref={ref}>
      {height === 'h-28' ? itemClicked : item}
    </div>
  );
};

export default ListItem;