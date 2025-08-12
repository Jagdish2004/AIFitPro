import './App.css'
import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router';
import { Button } from '@mui/material';
import { use } from 'react';
import {useState, useContext, useEffect } from 'react';
import { setCredentials } from './store/authSlice';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useDispatch } from 'react-redux';


function App() {
  const {token, tokenData, logIn, logOut, iaAuthenticated} = useContext(AuthContext)
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);

    }
  }, [token, tokenData, dispatch]);

  return (
    <>
      <Router>
        {!token ?(
           <Button variant='contained' color="#ffff" onClick={() =>{
          logIn();
        }}>login</Button>):(
          <div>
            <pre>{JSON.stringify(tokenData,null,2)}</pre>
          </div>
        )
        
      }
      </Router>
    </>
  )
}

export default App
