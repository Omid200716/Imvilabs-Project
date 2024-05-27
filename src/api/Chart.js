/**
 * @overview
 * Klassen sammanställer data för graf komponenten
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import { calculateZ } from '../utils/Calc';

const calculateZValues = (pauseArray, age) => {
    let trimmedResult = [];
    trimmedResult.push(0);
    for (let i = 1; i <= 59; i++) {
        const item = pauseArray[i];
        if (!pauseArray[i]) {
            trimmedResult.push(null);
        } else {
            trimmedResult.push(calculateZ(item, age, i));
        }
    }

    return trimmedResult;
};

const getTestsFromPatientID = (tests, patientId) => {
    return tests.filter((test) => test.patientId === patientId);
  };

const calcResult = (chartData) => {
    let amount = 0;
    chartData.filter((val) => val && val > 2 && amount++);
    
    const pauses = chartData.filter((val) => val && val);
    const percentage = (amount / (pauses.length)) * 100;

    return parseFloat(percentage).toFixed(1);
}

const getChartData = (chartData, resultNum, age) => {
        const result = chartData.Result;
        const results = chartData.Result[resultNum].Pause;
        const pauseLength = results.map((val) => val.pauseLength);
        const pauseZ = calculateZValues(pauseLength, age);        
        return {pauseZ, result};
    
};

export {getTestsFromPatientID, getChartData, calcResult};