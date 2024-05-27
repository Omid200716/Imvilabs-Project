import React, { useState } from 'react';
import ListItem from './ListItem'; // Se till att du importerar ListItem korrekt
import { MdKeyboardReturn } from 'react-icons/md';
import Cookies from 'js-cookie';
import UserDetails from './UserDetails';

const PatientList = ({ patients }) => {
 const [searchInput, setSearchInput] = useState('');
 const [selectedPatient, setSelectedPatient] = useState(null);

 const sortedPatients = () => {
    return patients.sort((a, b) => a.legPersId.localeCompare(b.legPersId));
 };

 const filteredPatients = () => sortedPatients().filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchInput.toLowerCase())
 );

 const handlePatientSelect = (patient) => {
  setSelectedPatient(patient);
};

 return (
  <div className='bg-slate-200 w-full h-full flex flex-col justify-center items-center rounded-md max-h-screen'>
      <div className='w-[95%] rounded-tl-md rounded-tr-md bg-slate-300 flex justify-center'>
        <input
          type="text"
          placeholder="Sök"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[95%] p-1 my-4 border border-gray-400 rounded bg-slate-100"
        />
      </div>
      <div className={`bg-slate-300 w-[95%] h-full rounded-bl-md rounded-br-md flex flex-col overflow-y-scroll pt-2`}>
        <h2>Lista över användare</h2>
        <ul>
          {filteredPatients().map((patient, index) => (
            <li key={index} onClick={() => handlePatientSelect(patient)}>
              {patient.legPersId}
            </li>
          ))}
        </ul>
        {selectedPatient && (
          <div>
            <h3>Vald användare: {selectedPatient.legPersId}</h3>
            <UserDetails user={selectedPatient} />
            {/* Här kan du lägga till ytterligare komponenter som TestItem för att visa tester */}
          </div>
        )}
      </div>
    </div>
 );
};

export default PatientList;
