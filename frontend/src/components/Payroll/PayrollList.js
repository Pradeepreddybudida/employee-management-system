// src/components/Payroll/PayrollList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PayrollList = () => {
    const [payrollRecords, setPayrollRecords] = useState([]);
    const history = useNavigate();
    const API_URL = "https://employee-management-system-ez8i.onrender.com";

    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/payroll`);
                const payrollData = response.data.map(record => {
                    let formattedDate = record.date;
                    if (record.date && record.date._seconds) {
                        formattedDate = new Date(record.date._seconds * 1000).toLocaleDateString();
                    }

                    return {
                        ...record,
                        date: formattedDate,
                    };
                });
                setPayrollRecords(payrollData);
            } catch (error) {
                console.error('Error fetching payroll records:', error);
            }
        };

        fetchPayroll();
    }, []);

    // Function to generate CSV report
    const generateReport = () => {
        const csvContent = [
            ["Employee Name", "Salary", "Date"], // Header
            ...payrollRecords.map(record => [record.employeeName, record.amount, record.date]) // Data
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "payroll_report.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '50px auto',
    };

    const tableStyle = {
        backgroundColor: '#f8f9fa',
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
    };

    const tdStyle = {
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #dee2e6',
    };

    const buttonStyle = {
        marginRight: '10px',
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
                <h2 className="my-4">Payroll List</h2>
                <Link to="/payroll/add" className="btn btn-primary mb-3">Add Payroll</Link>
                <button className="btn btn-success mb-3" onClick={generateReport}>Generate Report</button> {/* Report generation button */}
            </div>
            <table style={tableStyle} className="table table-striped">
                <thead>
                    <tr>
                        <th style={thStyle}>Employee Name</th>
                        <th style={thStyle}>Salary</th>
                        <th style={thStyle}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payrollRecords.map(record => (
                        <tr key={record.id}>
                            <td style={tdStyle}>{record.employeeName}</td>
                            <td style={tdStyle}>{record.amount}</td>
                            <td style={tdStyle}>{record.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayrollList;
