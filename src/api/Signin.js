
/**
 * @overview
 * Klassen står för funktioner vid inloggning
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import ApiRoutes from "../data-access"
import Cookies from 'js-cookie';

const loginVerified = async (userDetails) => {
    try {
      const response = await ApiRoutes.verifyLogin(userDetails);
      if (response.ok) {
        const data = await response.json();
        console.log(data, '--attribut--'); // Anta att detta innehåller { logindef: "imvi" } för en admin
        return data; // Returnera hela svaret, inklusive logindef
      }
    } catch (err) {
      console.error('Error during login verification:', err);
    }
    return null;
  }
  

// const loginVerified = async (userDetails) => {
//     try {
//         const attemptLogin = await ApiRoutes.verifyLogin({ username: userDetails.username, password: userDetails.password });
//         const data = await attemptLogin.json()
//         //här får jag attribut för logindef
//         console.log(data, '--atribut--')
//         if (attemptLogin.status === 200) {
//             return true;
//         }
//     } catch (err) {
//         console.error('Error during login verification:', err);
//     }
//     return false;
    
    
// }



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
  
        // Här antar vi att loginResponse innehåller { logindef: "U" } för vanliga användare
        // och { logindef: "imvi" } för administratörer
        const isAdmin = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "imvi");
        const isUser = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "U");
        const isUser2 = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "A");
        const isUser3 = legPersData.some(user => user.logindef === loginResponse.logindef && loginResponse.logindef === "L");
  
        // Anpassa responsen för att inkludera både isAdmin och isUser flaggor
        return { isAdmin, isUser, isUser2, isUser3};
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  

// const signin = async (userDetails) => { 
    
//     try {
//         const verify = await loginVerified(userDetails);
//         console.log(verify)
//         if (verify) {

         

//             const credentials = await ApiRoutes.getPatientCredentials({legpers: userDetails.username});
//             //console.log(credentials);

//             return credentials;

            

//         }
//     } catch (error) {
//         console.error(error);
//     }

//     return null;
    
    
// }

export { signin, signout };