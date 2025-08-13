import './App.css'
import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router';
import { Box, Button } from '@mui/material';
import {useState, useContext, useEffect } from 'react';
import { setCredentials } from './store/authSlice';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useDispatch } from 'react-redux';
import ActivityForm from './components/ActivityForm';
import ActivityDetail from './components/ActitvityDetail';
import ActivityList from './components/ActivityList';
const ActivityPage = () => { 
  return <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
    <ActivityForm onActivitiesAdded ={() => window.location.reload()} />
    <ActivityList />
  </Box>

}

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
          // <div>
          //   <pre>{JSON.stringify(tokenData,null,2)}</pre>
          // </div>

          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Routes>
           
            <Route path="/activities/" element={<ActivityPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token ? <Navigate to="/activities/" /> : <div> Login First</div>} />
           </Routes>
           </Box>
        )
        
      }
      </Router>
    </>
  )
}

export default App;