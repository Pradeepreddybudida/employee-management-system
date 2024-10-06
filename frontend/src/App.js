// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import AttendanceList from './components/Attendance/AttendanceList';
import AddAttendance from './components/Attendance/AddAttendance';
import PayrollList from './components/Payroll/PayrollList';
import AddPayroll from './components/Payroll/AddPayroll';
import EmployeeInfo from './components/Employee/EmployeeInfo';
import EmployeePayroll from './components/Employee/EmployeePayroll';
import EmployeeAttendance from './components/Employee/EmployeeAttendance';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Buffer } from 'buffer';
import './App.css'; 

window.Buffer = Buffer;

const App = () => {
    return (
      <AuthProvider>
        <Router>

            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/admin" element={ <PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Corrected 'component' to 'element' */}
                <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
                <Route path="/employees/add" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
                <Route path="/attendance" element={<PrivateRoute><AttendanceList /></PrivateRoute>} />
                <Route path="/attendance/add" element={<PrivateRoute><AddAttendance /></PrivateRoute>} />
                <Route path="/payroll" element={<PrivateRoute><PayrollList /></PrivateRoute>} />
                <Route path="/payroll/add" element={<PrivateRoute><AddPayroll /></PrivateRoute>} />
                <Route path="/employee-dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
                <Route path="/employee-info" element={<PrivateRoute><EmployeeInfo /></PrivateRoute>} />
                <Route path="/employee-attendance" element={<PrivateRoute><EmployeeAttendance /></PrivateRoute>} />
                <Route path="/employee-payroll" element={<PrivateRoute><EmployeePayroll /></PrivateRoute>} />
            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;
