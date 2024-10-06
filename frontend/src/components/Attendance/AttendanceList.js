// src/components/Attendance/AttendanceList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AttendanceList = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const history = useNavigate();
    const API_URL = "https://employee-management-system-ez8i.onrender.com";

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/attendance`);
                const attendanceData = response.data.map(record => ({
                    id: record.id,
                    employeeName: record.employeeName,
                    date: record.date ? new Date(record.date._seconds * 1000).toLocaleDateString() : "No Date",
                    status: record.status,
                }));
                setAttendanceRecords(attendanceData);
            } catch (error) {
                console.error("Error fetching attendance records:", error);
            }
        };

        fetchAttendance();
    }, []);

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '50px auto',
    };

    const tableStyle = {
        backgroundColor: '#f8f9fa', // Light background for the table
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thStyle = {
        backgroundColor: '#007bff', // Bootstrap primary color for headers
        color: 'white',
        padding: '10px',
    };

    const tdStyle = {
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #dee2e6', // Bootstrap border color
    };

    return (
        <div className="container" style={containerStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn btn-secondary me-2" onClick={() => history(-1)}>
                    Back
                </button>
                <button className="btn btn-primary" onClick={() => history('/admin')}>
                    Admin Dashboard
                </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h2 className="my-4">Attendance List</h2>
                <Link to="/attendance/add" className="btn btn-primary mb-3">Add Attendance</Link>
            </div>
            <table style={tableStyle} className="table table-striped">
                <thead>
                    <tr>
                        <th style={thStyle}>Employee Name</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map(record => (
                        <tr key={record.id}>
                            <td style={tdStyle}>{record.employeeName}</td>
                            <td style={tdStyle}>{record.date}</td>
                            <td style={tdStyle}>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceList;
