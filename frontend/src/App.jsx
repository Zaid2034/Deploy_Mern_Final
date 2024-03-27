/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { SignUp } from './components/signUp'
import './App.css'
import { ShoppingItem } from './components/shoppingList'
import {createBrowserRouter, RouterProvider,Router,Route ,Routes,Navigate} from 'react-router-dom';
import {SetLoggedInUsername,ClearLoggedInUsername} from './components/loggedIn'
import { Login } from './components/login';
import { EmailVerification } from './components/emailVerify';

function App() {
  const [auth, setAuth] = useState(true);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  function handleSignup (username) {
    // Perform authentication logic, then set auth to true
    setAuth(true);
    setLoggedInUsername(username);
    SetLoggedInUsername(username)
    // You may also want to store username/password securely or perform additional validation
  }
  function handleSignIn(){
    setAuth(false)
  }
  const router=createBrowserRouter([
    {
      path:"/",
      element:<SignUp onSignup={handleSignup}/>
    },
    {
      path:"/items",
      element:<ShoppingItem/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/verification",
      element:<EmailVerification/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>   
  )
  

}

export default App
