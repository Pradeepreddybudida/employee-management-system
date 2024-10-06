// src/components/Dashboard/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        heiht : "100%",
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    };

    const paragraphStyle = {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#555',
        fontSize: '1.1em',
    };

    const actionListStyle = {
        listStyleType: 'none',
        padding: '0',
        display: 'flex',
        justifyContent: 'center', // Center the links horizontally
        marginBottom : '50px',
        marginTop : '50px',
    };

    const listItemStyle = {
        margin: '0 15px', // Space between items
    };

    const linkStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'background-color 0.3s, transform 0.3s',
        fontWeight: 'bold',
    };

    const linkHoverStyle = {
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Admin Dashboard</h2>
            <p style={paragraphStyle}>Manage Employees, Attendance, and Payroll from here.</p>
            <div className="dashboard-links">
                <div style={{display: "flex", alignItems:"center", justifyContent:"center" }}>
                <h3>Actions</h3>
                </div>
                <ul style={actionListStyle}>
                    <li style={listItemStyle}>
                        <Link
                            to="/employees"
                            style={linkStyle}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
                                e.currentTarget.style.transform = linkHoverStyle.transform;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = linkStyle.backgroundColor;
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            Manage Employees
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            to="/attendance"
                            style={linkStyle}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
                                e.currentTarget.style.transform = linkHoverStyle.transform;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = linkStyle.backgroundColor;
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            View Attendance
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            to="/payroll"
                            style={linkStyle}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
                                e.currentTarget.style.transform = linkHoverStyle.transform;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = linkStyle.backgroundColor;
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            View Payroll
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            to="/login"
                            style={linkStyle}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
                                e.currentTarget.style.transform = linkHoverStyle.transform;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = linkStyle.backgroundColor;
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                         Login / Register
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
