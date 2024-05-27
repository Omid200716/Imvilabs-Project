/**
 * @overview
 * Här sköts nedladdning av testdata för användare
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { calcResult, getChartData, getTestsFromPatientID } from '../api/Chart';
import UserDataTestItem from './UserDataTestItem';

const UserData = ({ downloadPDF, setDownloadPDF, listData, user, view }) => {
  const [testData, setTestData] = useState(null);
  const [values, setValues] = useState(null);

  useEffect(() => {
    const generatePNG = async () => {
      if (downloadPDF) {
        const pdfContent = document.getElementById('pdf-content');

        try {
          const imgData = await domtoimage.toPng(pdfContent);
          saveAs(imgData, 'download.png');
          setDownloadPDF(false);
        } catch (error) {
          console.error('Error generating PNG:', error);
        }
      }
    };

    generatePNG();

    const tests = getTestsFromPatientID(listData?.tests, user?.patientId);
    setTestData(tests);

    const percentages = tests && tests.map((test) => {
      const chart1 = getChartData(test, 0, user.age || 14);
      
      const percentage1 = parseFloat(calcResult(chart1.pauseZ));
      const chart2 = getChartData(test, 1, user.age || 14);
      const percentage2 = parseFloat(calcResult(chart2.pauseZ));

      return parseFloat((percentage1 + percentage2) / 2).toFixed(1);
    });
    const best = Math.min(...(percentages || []))?.toFixed(1);
    const worst = Math.max(...(percentages || []))?.toFixed(1);
    const forbattringForsamring = percentages.slice(1).map((currentValue, index) => currentValue - percentages[index]);

    const average = parseFloat(forbattringForsamring.reduce((summa, forandring) => summa + forandring, 0) / (forbattringForsamring?.length || 1)).toFixed(1);

    setValues({ percentage: percentages && percentages, best, worst, average });
  }, [downloadPDF, listData, user, view, setDownloadPDF]);

  return (
    <div id="pdf-content" className={`flex flex-col w-screen sm:w-screen md:w-[95%] lg:w-[40rem] xl:w-[58rem] items-center rounded-md bg-white`}>
      <h1 className='text-lg mt-5'>{user?.firstName && user?.lastName && `${user.firstName} ${user.lastName}'s Utveckling`}</h1>
      {values && (
        <div className={`flex h-24 justify-between items-center px-2 py-2 w-[90%]`}>
          <p className='h-full flex items-center justify-center flex-col-reverse text-sm'>
            Medelutveckling {values.average < 0 ? <span className='text-[red] font-bold text-lg'>{values.average}%</span> : values.average > 0 ? <span className='text-[green] font-bold text-lg'>{values.average}%</span> : <span className='font-bold text-lg'>{values.average}%</span>}
          </p>
          <p className='h-full flex items-center justify-center flex-col-reverse text-sm'>
            Bäst Resultat {values.best > 18 ? <span className='text-[red] font-bold text-lg'>{isNaN(values.best) ? "0.0" : values.best}%</span> : <span className='font-bold text-lg'>{isNaN(values.best) ? "0.0" : values.best}%</span>}
          </p>
          <p className='h-full flex items-center justify-center flex-col-reverse text-sm'>
            Tidigare Resultat {values.worst > 18 ? <span className='text-[red] font-bold text-lg'>{isNaN(values.worst)? "0.0" : values.worst}%</span> : <span className='font-bold text-lg'>{isNaN(values.worst)? "0.0" : values.worst}%</span>}
          </p>
        </div>
      )}
      {testData &&
        values.percentage.map((val, index) => (
          <React.Fragment key={index}>
            <UserDataTestItem key={index} index={index} test={testData[index]} percentage={val} />
          </React.Fragment>
        ))}
    </div>
  );
};

export default UserData;