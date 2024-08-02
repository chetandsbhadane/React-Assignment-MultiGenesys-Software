import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const response = await axios.get(`/employees/${searchId}`);
        setEmployees([response.data]);
      } catch (error) {
        console.error('Error fetching employee by ID', error);
      }
    } else {
      fetchEmployees();
    }
  };

  const confirmDelete = (id) => {
    setEmployeeToDelete(id);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/employees/${employeeToDelete}`);
      setShowConfirmation(false);
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <Link to="/add">
        <button>Add New Employee</button>
      </Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email}
            <Link to={`/employee/${employee.id}`}>
              <button>Details</button>
            </Link>
            <Link to={`/edit/${employee.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => confirmDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Home;
