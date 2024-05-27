/**
 * @overview
 * Här är panelen som hanterar illustration komponenter
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import ResultIllustration from './ResultIllustration';

const IllustrationPanel = ({ firstChartData, secondChartData, age }) => {


  const loremIpsumText = "...Jag vill att ni till nu på torsdag när vi träffas nästa gång läser igenom kapitel 2 och 4, och det gäller speciellt sidorna 25 till 40 och sidorna 53 till 68. Kom ihåg att faktarutorna på dessa sidor är speciellt viktiga. Jag vill att ni ska kunna redogöra för vad som står där. Vi kommer att diskutera innehållet i smågrupper som vi delar in oss i när vi träffas. Glöm inte att ta med boken till på torsdag, det är viktigt. När vi har gått igenom de 5 första kapitlen i boken, så kommer jag att ge er en tenta på dessa kapitel. Jag återkommer med datumet för den här tentan senare. Ok, har alla uppfattat?...";

  const wordsArray = loremIpsumText.split(' ');
 
  return (
    <div className='flex flex-col justify-between items-center w-full'>
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='overflow-hidden '>
          <ResultIllustration pauses={firstChartData.result[0]} zValues={firstChartData.data} age={age} number={1}/>
        </div>
        <div className='overflow-hidden mb-10'>
          <ResultIllustration pauses={secondChartData.result[1]} zValues={secondChartData.data} age={age} number={2}/>
        </div>
      </div>
    </div>
  );
};

export default IllustrationPanel;