import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editData, setEditData] = useState({ name: '', position: '', salary: '' });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const API_URL = "https://employee-management-system-ez8i.onrender.com";

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await axios.get(`${API_URL}/api/employees`);
            setEmployees(response.data);
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (uid) => {
        try {
            await axios.delete(`${API_URL}/api/employees/${uid}`);
            setEmployees(employees.filter((employee) => employee.id !== uid));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setEditData({ name: employee.name, position: employee.position, salary: employee.salary });
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            const { name, position, salary } = editData;
            await axios.put(`${API_URL}/api/employees/${editingEmployee.id}`, {
                name,
                position,
                salary,
            });
            setEmployees(
                employees.map((emp) =>
                    emp.id === editingEmployee.id ? { ...emp, name, position, salary } : emp
                )
            );
            setShowModal(false);
            setEditingEmployee(null);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '10px',
        borderBottom: '1px solid #ccc',
    };

    const buttonStyle = {
        margin: '0 5px',
    };

    return (
        <div style={containerStyle}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                    Back
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/admin')}>
                    Admin Dashboard
                </button>
            </div>
            <h2 style={headingStyle}>Employee List</h2>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Link to="/employees/add" className="btn btn-primary mb-3">
                Add Employee
            </Link>
            </div>
            <table style={tableStyle} className="table table-bordered">
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Position</th>
                        <th style={thStyle}>Salary</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td style={tdStyle}>{employee.name}</td>
                            <td style={tdStyle}>{employee.position}</td>
                            <td style={tdStyle}>{employee.salary}</td>
                            <td style={tdStyle}>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(employee)} style={buttonStyle}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(employee.id)} style={buttonStyle}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {showModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Employee</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Position</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editData.position}
                                        onChange={(e) => setEditData({ ...editData, position: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Salary</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editData.salary}
                                        onChange={(e) => setEditData({ ...editData, salary: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSaveEdit}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
