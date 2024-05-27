/**
 * @overview
 * Panelen slår ihop alla komponenter som visas för data sidan.
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import Chart from './Chart';
import { getChartData } from "../api/Chart";
import graf from '../imgs/graf.png'
import { calcResult } from '../api/Chart';
import ChartEvaluation from './ChartEvaluation';
import IllustrationPanel from './IllustrationPanel';
import UserData from './UserData';

const ChartsPanel = ({ listData, chartData, testUser, chartUser, setFirstChartData, firstChartData, secondChartData, setSecondChartData }) => {
  const [viewIllustration, setViewIllustration] = useState(false);
  const [downloadPDF, setDownloadPDF] = useState(false);
  const [viewData, setViewData] = useState(false);
  useEffect(() => {
    try {
      if (chartData) {
        const chart1 = getChartData(chartData, 0, chartUser.age ? chartUser.age : 14);
        const percentage1 = calcResult(chart1.pauseZ);
        setFirstChartData({ data: chart1.pauseZ, percentage: percentage1, result: chart1.result });
        const chart2 = getChartData(chartData, 1, chartUser.age ? chartUser.age : 14);
        const percentage2 = calcResult(chart2.pauseZ);
        setSecondChartData({ data: chart2.pauseZ, percentage: percentage2, result: chart1.result });
      }
    } catch (error) {
      console.error(error);
    }

  }, [chartData, chartUser])

  let indexArr = Array.from({ length: 60 }, (_, i) => i + 1);

  const Buttons = () => {
    return viewData && (<div className='flex justify-around h-full items-center sticky bottom-0 bg-[#ffffff80] py-5'>
      <button className=' border-4 border-black bg-white py-1 w-[25%] min-w-[10rem] rounded-md' onClick={() => {setViewData(!viewData ? true : false); setViewIllustration(false);}}>{!viewData ? 'Användardata' : 'Bakåt'}</button>
    <button className=' py-2 w-[25%] min-w-[10rem] bg-black text-white rounded-md ' onClick={() => { setDownloadPDF(!downloadPDF)}}>Exportera PNG</button>
    
  </div>)
  }

  return (

    <div className=' flex-col bg-white w-screen sm:w-screen md:w-full lg:w-[40rem] xl:w-[58rem] rounded-md flex items-center justify-center cursor-default'>

      {(chartData && (firstChartData && secondChartData)) ? (
        <div className='flex flex-col justify-around h-full w-full pb-10'>
          {!viewIllustration && !viewData ? (<div className='mb-10'>
            <div className='hover:bg-slate-100 pt-10'>
              <Chart data={firstChartData.data.map(pauseLength => ({ time: indexArr, Första: isNaN(pauseLength) ? 0 : pauseLength }))} percentage={firstChartData.percentage} dataKey={"Första"} />
              <ChartEvaluation percentage={firstChartData.percentage} showPercentage={true}/>
            </div>
            <div className='pt-10 hover:bg-slate-100'>
              <Chart data={secondChartData.data.map(pauseLength => ({ time: indexArr, Andra: pauseLength }))} percentage={secondChartData.percentage} dataKey={"Andra"} />
              <ChartEvaluation percentage={secondChartData.percentage} showPercentage={true} />
            </div>
            {/*<ResultPageSelect result={firstChartData.result} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />*/}
          </div>) : viewData ? <div className='h-full overflow-scroll'><UserData show={viewData} downloadPDF={downloadPDF} user={chartUser} listData={listData} setDownloadPDF={setDownloadPDF}></UserData></div> : 
            <IllustrationPanel firstChartData={firstChartData} secondChartData={secondChartData} age={chartUser.age} />}
            <Buttons></Buttons>
            {!viewData && <div className='flex justify-around h-full items-center sticky bottom-0 bg-[#ffffff9e] backdrop-blur-3xl py-5'>
            <button className=' border-4 border-black bg-white py-1 w-[25%] min-w-[10rem] rounded-md' onClick={() => {setViewIllustration(!viewIllustration ? true : false); setViewData(false)}}>{!viewIllustration ? 'Visa Illustration' : 'Bakåt'}</button>
            <button className='py-2 w-[25%] min-w-[10rem] bg-black text-white rounded-md' onClick={() => {setViewData(!viewData ? true : false); setViewIllustration(false)}}>{'Användardata'}</button>
          </div>}
        </div>) : (!chartData ? (<div className="relative ">

          <img className="w-full h-auto" src={graf} alt="Your Alt Text" />


          <div className="absolute inset-0 flex items-center justify-center text-center text-slate-950 bg-[#ffffffcb] text-xl sm:text-xl lg:text-2xl xl:text-4xl">
            Välj en användare för att visa statistik
          </div>
        </div>) :
          <BeatLoader className="mb-10" color="#000" />)}
    </div>

  );
};

export default ChartsPanel;