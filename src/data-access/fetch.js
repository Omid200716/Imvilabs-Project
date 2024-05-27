/**
 * @overview
 * Fetch funktion som hämtar data från extern api
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

const createFetch = (BASE_URL) => {

    return Object.freeze({
        fetchJsonData
    })

    async function fetchJsonData({ endpoint, method, body, json = true }) {

        const results = await fetch(BASE_URL + endpoint, {
            method,
            body: body && JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (json) {
            return await results.json();
        }

        return results;
    }
};

export default createFetch;