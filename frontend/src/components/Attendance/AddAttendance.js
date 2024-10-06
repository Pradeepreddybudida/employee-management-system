// src/components/Attendance/AddAttendance.js
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddAttendance = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
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

    const handleAddAttendance = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'attendance'), {
                employeeId,
                date: new Date(date), // Ensure the date is a Date object
                status,
                createdAt: new Date(), // Store creation timestamp
            });
            alert('Attendance record added successfully');
            setEmployeeId('');
            setDate('');
            setStatus('');
        } catch (error) {
            console.error('Error adding attendance record:', error);
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        height: '100%',
    };

    const buttonStyle = {
        marginRight: '10px',
    };

    return (
        <div className="container" style={containerStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h2 className="my-4">Add Attendance</h2>
            </div>
            <form onSubmit={handleAddAttendance}>
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
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px" }}>
                    <button type="submit" className="btn btn-primary">Add Attendance</button>
                </div>
            </form>
        </div>
    );
};

export default AddAttendance;
