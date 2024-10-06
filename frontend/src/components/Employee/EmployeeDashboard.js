// src/components/Employee/EmployeeDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Employee Dashboard</h1>
            <div style={styles.navLinks}>
                <Link to="/employee-info" style={styles.linkButton}>Employee Info</Link>
                <Link to="/employee-attendance" style={styles.linkButton}>Attendance</Link>
                <Link to="/employee-payroll" style={styles.linkButton}>Payroll</Link>
                <Link to="/login" style={styles.linkButton}>Login / Register</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        //backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    title: {
        color: '#333',
        fontSize: '36px',
        marginBottom: '30px',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
    },
    linkButton: {
        textDecoration: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '15px 25px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'all 0.3s ease',
    },
    linkButtonHover: {
        backgroundColor: '#0056b3',
    },
};

// Add hover effect using JavaScript
styles.linkButton[':hover'] = styles.linkButtonHover;

export default EmployeeDashboard;
