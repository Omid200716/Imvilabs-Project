
/**
 * @overview
 * Denna klass hanterar autentiseringsprocesser vid inloggning. Funktionerna inkluderar att verifiera 
 * användaruppgifter och att dirigera användare till korrekt sida baserat på deras roll attribut som fås från API. 
 * Specifikt hanterar funktionen `signin` logik för att öppna olika användargränssnitt baserat på attributen "logindef" 
 * från API, vilket identifierar om användaren är admin (imvi), användare (U), eller andra roller (A, L).
 * Uppdateringar gjordes för att hantera dessa attribut och styra navigeringen efter inloggning.
 *
 * @author
 * Ursprungliga funktioner av Viktor Johansson.
 * Ytterligare utveckling och anpassningar av Omid Nikzad.
 *
 * @version 1.0.1
 * @since November, 2023
 * @updated Juni 2024 av Omid Nikzad för att inkludera avancerad rollhantering och navigationslogik.
 */


import ApiRoutes from "../data-access"
import Cookies from 'js-cookie';

const loginVerified = async (userDetails) => {
    try {
      const response = await ApiRoutes.verifyLogin(userDetails);
      if (response.ok) {
        const data = await response.json();
        //console.log(data, '--attribut--'); 
        return data; 
      }
    } catch (err) {
      console.error('Error during login verification:', err);
    }
    return null;
  }
  
const signout = () => {
    if (Cookies.get('session_user') !== null) {
        Cookies.remove('session_user');
        Cookies.remove('origin');
        return true;
    }
    return false;
}

const signin = async (userDetails) => {
    try {
      const loginResponse = await loginVerified(userDetails);
      if (loginResponse) {
        const legPersData = await ApiRoutes.getLegPersData();
        const isAdmin = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "imvi");
        const isUser  = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "U");
        const isUser2 = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "A");
        const isUser3 = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "L");
        return { isAdmin, isUser, isUser2, isUser3};
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  
export { signin, signout };