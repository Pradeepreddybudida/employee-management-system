// src/components/Employee/EmployeePayroll.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jsPDF

const EmployeePayroll = () => {
    const [payrollRecords, setPayrollRecords] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState(null); // State to hold employee info
    const [error, setError] = useState('');
    const history = useNavigate();

    useEffect(() => {
        const fetchPayroll = async () => {
            const user = auth.currentUser;
            if (user) {
                // Fetch payroll records
                const payrollQuery = query(collection(db, 'payroll'), where('employeeId', '==', user.uid));
                const payrollSnapshot = await getDocs(payrollQuery);
                const records = payrollSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                // Fetch employee information using the document ID which is the same as the UID
                const empDocRef = doc(db, 'employees', user.uid); // Reference the document using doc()
                const empDoc = await getDoc(empDocRef); // Use getDoc() to get the document
    
                if (empDoc.exists()) {
                    setEmployeeInfo({ id: empDoc.id, ...empDoc.data() }); // Set employee info if document exists
                } else {
                    setError('Employee information not found.');
                }
    
                if (records.length === 0) {
                    setError('No payroll records found.');
                } else {
                    setPayrollRecords(records);
                }
            }
        };
    
        fetchPayroll();
    }, []);
    
    // Function to generate PDF
    const generateReport = () => {
        const doc = new jsPDF();
       
        
        // Add Employee Information
        if (employeeInfo) {
            doc.setFontSize(12);
            doc.text(`Employee Name: ${employeeInfo.name}`, 14, 20); // Assuming 'name' field in employee info
           // doc.text(`Employee ID: ${employeeInfo.employeeId}`, 14, 50); // Assuming 'employeeId' field in employee info
           // Assuming 'department' field in employee info
            doc.text(`Position: ${employeeInfo.position}`, 14, 30);
            doc.text(`Salary: ${employeeInfo.salary}`, 14, 40);  // Assuming 'position' field in employee info
            doc.text('', 14, 80); // Extra space before payroll records
        }

        // Add Payroll Records Header
        doc.setFontSize(18);
        doc.text('Payroll Records', 14, 72);
        doc.setFontSize(12);
        doc.text('Date', 14, 90);
        doc.text('Amount', 80, 90);
        
        payrollRecords.forEach((record, index) => {
            const yPosition = 100 + (10 * index);
            doc.text(record.date, 14, yPosition);
            doc.text(`Rs ${record.amount}`, 80, yPosition);
        });
        
        doc.save('payroll_records.pdf');
    };

    // Styles for the component
    const styles = {
        container: {
            height: '100vh', // Full height
            padding: '30px',
            background: '#f4f4f4', // Light gray background
            borderRadius: '0',
            boxShadow: 'none',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflowY: 'auto',
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
            background: '#fff', // White background for the table
            borderRadius: '8px',
            overflow: 'hidden', // Ensure rounded corners are visible
        },
        th: {
            color: 'black',
            padding: '12px',
            borderRadius: '5px',
            textAlign: 'left',
        },
        td: {
            padding: '12px',
            borderBottom: '1px solid #ddd',
            color: '#555',
            textAlign: 'left',
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
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <h2 style={styles.header}>Payroll Records</h2>
                {error && <p style={styles.errorText}>{error}</p>}
                <button 
                    className="btn btn-success mb-3"
                    onClick={generateReport}> {/* Generate Report Button */}
                    Generate Report
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {payrollRecords.map(record => (
                        <tr key={record.id} style={styles.tableRow}>
                            <td style={styles.td}>{record.date}</td>
                            <td style={styles.td}>₹{record.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePayroll;
