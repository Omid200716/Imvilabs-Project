/**
 * @overview
 * Klassen representerar inloggning - just nu används endast signin.
 * 
 * @signinContent
 * - Här kan du redigera texten som visas vid inloggning
 * 
 * @authorYtterligare utveckling och anpassningar av Omid Nikzad.
 * Ursprungliga klasser och komponenter av Viktor Johansson
 * 
 * @version 1.0.0
 * @since November, 2023. Uppdatering i Juni 2024
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signin } from '../api'



const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "MapCog Inlogg",
  subheader: "Vänligen fyll i ditt användarnamn och lösenord för att ta dig vidare.",
  buttonText: "Sign In",
  wrongLogin: "Inloggningen misslyckades - du angav felaktigt användarnamn / lösenord"
}

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Create Account",
}




function AuthForm({ authMode }) {
  const content = authMode === "register" ? registerContent : signinContent;

  const initial = { email: '', username: '', password: '' }
  const [formState, setFormState] = useState({ ...initial });
  const [msg, setMSG] = useState('');

  const navigate = useNavigate();

 const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  try {
    const { isAdmin, isUser, isUser2, isUser3 } = await signin(formState);

    if (isAdmin) {
      // Navigera till admin-vyn
      navigate('/admin');
      Cookies.set('session_user', formState.username, { expires: 1 });
    } else if (isUser || isUser2 || isUser3 ) {
      // Navigera till användarvyn
      navigate('/');
      Cookies.set('session_user', formState.username, { expires: 1 });
    } else {
      // Användaren har inte behörighet, visa felmeddelande
      setMSG("Du har inte behörighet att logga in.");
    }
  } catch (err) {
    setMSG("Inloggning misslyckades");
    console.error(err);
  } finally {
    setFormState({ ...initial });
  }
}, [formState, navigate]);



  return (

    <div className='rounded-3xl px-10 py-4 flex justify-center items-center h-full '>

      <div className="w-[20rem] sm:w-[25rem]">
        <div className="text-center">
          <h2 className="text-7xl mb-2 font-semibold">{content.header}</h2>
          {msg ? (<p className='text-[#e33939] mb-4 mt-24 text-center'>{msg}</p>) :
            (<p className="tex-lg mb-4 mt-24 text-slate-800">{content.subheader}</p>)}
        </div>
        <form onSubmit={handleSubmit} className="w-full">

          <div className="mb-5 mt-6">
            <div className="text-lg mb-2 ml-2 font-semibold text-slate-950">Användarnamn</div>
            <input
              required
              type="text"
              value={formState.username}
              className="border-solid border-slate-950 border-2 px-6 py-2 text-lg bg-slate-200 rounded-lg w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, username: e.target.value }))
              }
            />
          </div>
          {authMode === "register" && (
            <div className="mb-5">
              <div className="text-lg mb-2 ml-2 text-black/50">
                Användarnamn
              </div>
              <input
                required
                type="text"
                value={formState.username}
                className="border-solid border-slate-950 border-2 px-6 py-2 text-lg bg-slate-200 rounded-lg w-full"
                onChange={(e) =>
                  setFormState((s) => ({ ...s, username: e.target.value }))
                }
              />
            </div>
          )}
          <div className="mb-6">
            <div className="text-lg mb-2 ml-2 font-semibold text-slate-950">Lösenord</div>
            <input
              required
              value={formState.password}
              type="password"
              className="border-solid border-slate-950 border-2 px-6 py-2 text-lg bg-slate-200 rounded-lg w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            {/*<div>
                  <span>
                    <a
                      href={content.linkUrl}
                      className="text-blue-600 font-bold"
                      {content.linkText}
                    </a>
                    > 
                   
                      
                  </span>
                </div>*/}
            <button type="submit" intent="secondary" className='py-3 w-full bg-slate-600 rounded-lg'>
              <p className='text-white'>{content.buttonText}</p>
            </button>
          </div>

        </form>
      </div>
    </div>

  );
}

export default AuthForm;