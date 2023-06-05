import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import CountryList from './components/CountryList';

function App() {
  return (
    <Container maxWidth="20sm">
      <Router>
        <Routes>
          <Route path="/" element={<CountryList />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
