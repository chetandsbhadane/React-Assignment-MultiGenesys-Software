import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details', error);
    }
  };

  return (
    <div>
      {employee ? (
        <div>
          <h1>{employee.name}</h1>
          <p>Email: {employee.email}</p>
          <p>Mobile: {employee.mobile}</p>
          <p>Country: {employee.country}</p>
          <p>State: {employee.state}</p>
          <p>District: {employee.district}</p>
          <Link to={`/edit/${employee.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
