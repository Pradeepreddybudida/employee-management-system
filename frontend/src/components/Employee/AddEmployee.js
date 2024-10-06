// src/components/Employee/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const history = useNavigate();
    const API_URL = "https://employee-management-system-ez8i.onrender.com";
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/api/employees`, { id,name, position, salary });
        history('/employees'); // Redirect to employee list
    };

    return (
        <div className="container">
            <h2>Add Employee</h2>
            <form onSubmit={handleAddEmployee}>
            <div className="mb-3">
                    <label className="form-label">Id</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
            <div className="mt-4">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => history(-1)} // Navigate to the previous page
                >
                    Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => history('/admin')} // Navigate to the employee dashboard
                >
                    Admin Dashboard
                </button>
            </div>
        </div>
    );
};

export default AddEmployee;
