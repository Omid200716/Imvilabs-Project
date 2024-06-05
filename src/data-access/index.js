/**
 * @overview
 * Här hanteras API-anrop och olika endpoints för basurl.
 * 
 * @author
 * Ursprungliga klasser och komponenter av Viktor Johansson.
 * Ytterligare utveckling och anpassningar av Omid Nikzad.
 * 
 * @version 1.0.0
 * @since November, 2023.
 * @updated Juni 2024 för inkludering av nya endpoints.
 */


import createFetch from './fetch';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetcher = () => {
  if (!BASE_URL) {
    console.error('API base URL is not given.');
    return;
  }
  const fetcher = createFetch(BASE_URL);
  return fetcher;
}

const ApiRoutes = {
  getPatientCredentials: async (obj) => await fetcher().fetchJsonData({
    endpoint: '/fetch-mapcog-data',
    method: 'POST',
    body: obj,
  }),
  verifyLogin: async (user) => {
    //console.log(user)
    return await fetcher().fetchJsonData({
    endpoint: '/web-login-mapcog',
    method: 'POST',
    body: user,
    json: false,
  })
},

  getLegPersData: async () => {
    try {
      const url = `${BASE_URL}/get-legpers`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP-fel: ${response.status}`);
      }
      const data = await response.json();
     // console.log('LegPersData fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('Ett fel uppstod vid hämtning av legpers-data:', error);
      throw error;
    }
 },
};


export default ApiRoutes;