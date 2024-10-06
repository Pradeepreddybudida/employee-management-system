// src/components/Attendance/EmployeeAttendance.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const EmployeeAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [error, setError] = useState('');
    const history = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, 'attendance'), where('employeeId', '==', user.uid));
                const snapshot = await getDocs(q);
                const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (records.length === 0) {
                    setError('No attendance records found.');
                } else {
                    setAttendanceRecords(records);
                }
            }
        };

        fetchAttendance();
    }, []);

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        }
        return '';
    };

    // Styles for the component
    const styles = {
        container: {
            height: '100vh', // Full height
            padding: '30px',
            background: '#ffffff',
            borderRadius: '0',
            boxShadow: 'none',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Align items at the start
            alignItems: 'center',
            overflowY: 'auto', // Allow scrolling if needed
        },
        header: {
            color: '#333',
            marginBottom: '20px',
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center',
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
            width: '100%',
            marginBottom: '20px',
        },
        button: {
            padding: '12px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            fontWeight: '600',
            width: 'auto', // Adjust width to allow spacing
        },
        btnPrimary: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        btnSecondary: {
            backgroundColor: '#6c757d',
            color: 'white',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            //background: '#007bff',
            color: 'black',
            padding: '12px',
            borderRadius: '5px',
        },
        td: {
            padding: '12px',
            borderBottom: '1px solid #ddd',
            color: '#555',
        },
        tableRow: {
            '&:hover': {
                backgroundColor: '#f5f5f5',
            },
        },
    };

    return (
        <div style={styles.container}>
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
            <h2 style={styles.header}>Attendance Records</h2>
            {error && <p style={styles.errorText}>{error}</p>}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map(record => (
                        <tr key={record.id} style={styles.tableRow}>
                            <td style={styles.th}> {formatDate(record.date)}</td>
                            <td style={styles.th}>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeAttendance;
