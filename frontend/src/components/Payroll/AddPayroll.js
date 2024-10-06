// src/components/Payroll/AddPayroll.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const AddPayroll = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [employees, setEmployees] = useState([]);
    const history = useNavigate();
    const API_URL = "https://employee-management-system-ez8i.onrender.com";

    useEffect(() => {
        const fetchEmployees = async () => {
            const empCollection = collection(db, 'employees');
            const empSnapshot = await getDocs(empCollection);
            const empList = empSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEmployees(empList);
        };

        fetchEmployees();
    }, []);

    const handleAddPayroll = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/api/payroll`, { employeeId, amount, date });
        history('/payroll'); // Redirect to payroll list
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        height : "100%",
    };

    const buttonStyle = {
        marginRight: '10px',
    };

    return (
        <div className="container" style={containerStyle}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <button
                    className="btn btn-secondary me-2"
                    style={buttonStyle}
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
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <h2 className="my-4">Add Payroll Record</h2>
            </div>
            <form onSubmit={handleAddPayroll}>
                <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <select
                        className="form-control"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", marginTop:"40px"}}>
                <button type="submit" className="btn btn-primary">Add Payroll</button>
                </div>
            </form>
        </div>
    );
};

export default AddPayroll;
