import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import AddEditEmployee from './components/AddEditEmployee';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add" element={<AddEditEmployee />} />
          <Route path="/edit/:id" element={<AddEditEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
