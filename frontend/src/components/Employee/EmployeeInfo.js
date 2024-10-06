// src/components/Employee/EmployeeInfo.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const EmployeeInfo = () => {
    const history = useNavigate();
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            const user = auth.currentUser;
            if (user) {
                const employeeDoc = await getDoc(doc(db, 'employees', user.uid));
                if (employeeDoc.exists()) {
                    setEmployeeInfo(employeeDoc.data());
                } else {
                    setError('No employee information found.');
                }
            }
        };

        fetchEmployeeInfo();
    }, []);

    // Styles for the component
    const styles = {
        container: {
            width: "100%",
            maxWidth: '600px',
            margin: 'auto',
            padding: '30px',
           // background: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'left',
        },
        header: {
            color: '#333',
            marginBottom: '20px',
            fontSize: '28px',
            fontWeight: '700',
            textAlign: 'center',
        },
        infoCard: {
            background: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        infoText: {
            margin: '10px 0',
            fontSize: '18px',
            lineHeight: '1.5',
            color: '#555',
        },
        errorText: {
            color: '#e74c3c',
            textAlign: 'center',
            fontSize: '16px',
            marginBottom: '20px',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        button: {
            padding: '12px 12px',
            fontSize: '13px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            fontWeight: '600',
            width: '48%', // Adjust width to allow spacing
        },
        btnPrimary: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        btnSecondary: {
            backgroundColor: '#6c757d',
            color: 'white',
        },
        buttonHover: {
            '&:hover': {
                transform: 'scale(1.05)',
                opacity: 0.9,
            },
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Employee Information</h2>
            {error && <p style={styles.errorText}>{error}</p>}
            {employeeInfo ? (
                <div style={styles.infoCard}>
                    <p style={styles.infoText}><strong>Name:</strong> {employeeInfo.name}</p>
                    <p style={styles.infoText}><strong>Position:</strong> {employeeInfo.position}</p>
                    <p style={styles.infoText}><strong>Salary:</strong> ₹{employeeInfo.salary}</p>
                    <p style={styles.infoText}><strong>Created At:</strong> {employeeInfo.createdAt.toDate().toLocaleString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div style={styles.buttonGroup}>
                <button 
                    style={{ ...styles.button, ...styles.btnSecondary }} 
                    onClick={() => history(-1)}>
                    Back
                </button>
                <button 
                    style={{ ...styles.button, ...styles.btnPrimary }} 
                    onClick={() => history('/employee-dashboard')}>
                    Employee Dashboard
                </button>
            </div>
        </div>
    );
};

export default EmployeeInfo;
