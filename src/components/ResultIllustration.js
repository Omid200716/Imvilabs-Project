/**
 * @overview
 * Här illsutreras resultatet i form av text och antalet missade ord.
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useState } from 'react';
import { calculateZ } from '../utils/Calc';

const ResultIllustration = ({ pauses, zValues, age, number }) => {

  const loremIpsumText = "...Jag vill att ni till nu på torsdag när vi träffas nästa gång läser igenom kapitel 2 och 4, och det gäller speciellt sidorna 25 till 40 och sidorna 53 till 68. Kom ihåg att faktarutorna på dessa sidor är speciellt viktiga. Jag vill att ni ska kunna redogöra för vad som står där. Vi kommer att diskutera innehållet i smågrupper som vi delar in oss i när vi träffas. Glöm inte att ta med boken till på torsdag, det är viktigt. När vi har gått igenom de 5 första kapitlen i boken, så kommer jag att ge er en tenta på dessa kapitel. Jag återkommer med datumet för den här tentan senare. Ok, har alla uppfattat?...";

  const wordsArray = loremIpsumText.split(' ');
  

  const [htmlContent, setHTMLContent] = useState([]);
  const [percentage, setPercentage] = useState([]);
  useEffect(() => {
    const calculatePauses = (pauses, zValues) => {
      const perWord = 1.0 / wordsArray.length;

      let darkSpan = "<span style=\"color: #00000;\"> ";
      let lightSpan = "<span style=\"color: #A0A0A0; font-weight: normal;\">";
      let endSpan = "</span>";
      let html = "";
      let lastTime = 0;
      let numBadWords = 0;
      let wasOver = false;
      let lastWord = 0;
      

      for (let i = 1; i < Math.min(60, pauses.Pause.length); i++) {
        const pause = pauses.Pause[i];
        const z = calculateZ(pause.pauseLength, age, i);
        
        
        if (z > 2.0) {
          let timeSince = pause.pauseTime - lastTime;
          lastTime = pause.pauseTime + pause.pauseLength;

          const words = parseInt((timeSince / 60000) / perWord);
          let lim = lastWord + words;

          if (words > 0) {
            if (wasOver) {
              html += lightSpan;
            } else {
              html += darkSpan;
            }

            for (let j = lastWord; j < wordsArray.length && j < lim; j++) {
              lastWord = j;
              html += wordsArray[j] + " ";
              if (wasOver) numBadWords++;
            }
            lastWord++;
            html += endSpan;
          }

          if (lastWord === wordsArray.length - 1) break;
          const badWords = parseInt((pause.pauseLength / 60000) / perWord);
          lim = lastWord + badWords;

          if (badWords > 0) {
            html += lightSpan;
            for (let j = lastWord; j < wordsArray.length && j < lim; ++j) {
              lastWord = j;
              html += wordsArray[j] + " ";
              numBadWords++;
            }
            lastWord++;
            html += endSpan;
          }
          
          if (lastWord === wordsArray.length - 1) break;
          wasOver = true;
        } else {
          wasOver = false;
        }
      }

      if (lastWord < wordsArray.length) {
        html += darkSpan;
        for (let j = lastWord; j < wordsArray.length; ++j) {
          html += wordsArray[j] + " ";
        }
        lastWord++;
        html += endSpan;
      }

      const percentage = parseInt((numBadWords / wordsArray.length) * 100);
      setPercentage(percentage + "%");
      setHTMLContent(html);
    };

    calculatePauses(pauses, zValues);

  }, [zValues, pauses]);

  return (
    <div>
        <div className='overflow-hidden flex flex-col items-center hover:bg-slate-50 py-5 cursor-default'>
        <div className='  text-black w-full py-10  mb-5'>
          <h1 className='text-center font-extrabold text-2xl'>Resultat {number}</h1>
        </div>
          <div className={"w-[80%] sm:w-[50%]"} dangerouslySetInnerHTML={{ __html: htmlContent }} />
          <div className='  text-black w-full mt-5 rounded-lg py-10'>
          <p className='text-center font-semibold'>Missade ord</p>
          <p className='text-center font-semibold'>{percentage}</p>
          </div>
        </div>
    </div>
  );
};

export default ResultIllustration;