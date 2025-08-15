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
  return (
    <Box component="section" sx={{
      p: { xs: 1, sm: 2, md: 4 },
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      background: 'transparent',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 4,
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexWrap: 'wrap',
      overflow: 'hidden',
    }}>
      <Box sx={{
        flex: { xs: 'unset', md: '0 0 50%' },
        width: { xs: '100%', md: 'clamp(350px, 50vw, 700px)' },
        minWidth: { xs: '100%', md: '350px' },
        maxWidth: { xs: '100%', md: '700px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: { md: '80vh' },
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      </Box>
      <Box sx={{
        flex: 2,
        width: { xs: '100%', md: 'clamp(350px, 50vw, 900px)' },
        minWidth: { xs: '100%', md: '350px' },
        maxWidth: { xs: '100%', md: '900px' },
        maxHeight: { xs: 'none', md: '80vh' },
        overflowY: { xs: 'visible', md: 'auto' },
        pr: { md: 2 },
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}>
        <ActivityList />
      </Box>
    </Box>
  );
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
          <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <img src="/vite.svg" alt="AlfitPro Logo" style={{ width: 80, marginBottom: 16 }} />
              <h1 style={{ fontWeight: 700, fontSize: '2.5rem', color: '#3f51b5', margin: 0 }}>Welcome to AlfitPro</h1>
              <p style={{ color: '#555', fontSize: '1.1rem', marginTop: 8 }}>Track your fitness journey with ease and style.</p>
            </Box>
            <Button
              variant="contained"
              onClick={() => { logIn(); }}
              sx={{
                background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.2rem',
                padding: '12px 36px',
                borderRadius: '30px',
                boxShadow: '0 4px 20px 0 rgba(63,81,181,0.15)',
                textTransform: 'none',
                letterSpacing: 1,
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #283593 0%, #1976d2 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 24px 0 rgba(33,150,243,0.18)',
                },
              }}
            >
              Login
            </Button>
          </Box>
        ):(
          

          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button variant='contained' color="#ffff" onClick={() =>{
                    logOut();
            }}>logout</Button>
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