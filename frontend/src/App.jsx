import './App.css'
import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router';
import { Button } from '@mui/material';

function App() {

  return (
    <>
      <Router>
        <Button variant='contained' color="#ffff">login</Button>
      </Router>
    </>
  )
}

export default App
