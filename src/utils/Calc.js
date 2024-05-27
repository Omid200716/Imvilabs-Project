/**
 * @overview
 * Här sammanställs Z värden baserat på data som används för grafen.
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import test1 from '../test1.json'
import test2 from '../test2.json'

const getJson = (pAge) => {
    const data1 = test1.data;
    const data2 = test2.data;

    if (!(data1 && data2)) {
        console.error("Could not find JSON file.")
    }

    const path = pAge < 15 ? data1 : data2;
    return path;
}

// metoden calculateZ tar in registrerade paustider från testerna, patientens ålder och paustidens index över uppmätta pauser. Den returnerar typen float.
const calculateZ = (pPauseTime, pAge, pIndex) => {
    //patientens ålder kollas - är dom under 15 används första settet annars används det andra
    const json = getJson(pAge);
    if (json) {
        //medelvärdet är det första värdet i kolumnen
        const average = json[pIndex][0];
        //standard avvikelsen är den andra kolumnen
        const SD = json[pIndex][1];
        //en float som räknas ut av pausens tid i (millisekunder - medelvärdet) / standardavvikelse
        return (pPauseTime - average) / SD;
    }
}

export { calculateZ }