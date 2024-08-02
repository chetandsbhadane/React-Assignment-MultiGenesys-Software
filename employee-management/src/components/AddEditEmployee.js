import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    district: ''
  });
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
    if (id) fetchEmployee();
  }, [id]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries', error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details', error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/employees/${id}`, employee);
      } else {
        await axios.post('/employees', employee);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={employee.mobile}
          onChange={handleChange}
        />
        <select
          name="country"
          value={employee.country}
          onChange={handleChange}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={employee.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={employee.district}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddEditEmployee;
