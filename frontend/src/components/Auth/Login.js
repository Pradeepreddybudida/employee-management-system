// src/components/Auth/Login.js
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // State for admin role
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            // Check if the user is an admin
            if (isAdmin) {
                const isAdminUser = await checkIfAdmin(email); // Check if the email belongs to an admin
                if (isAdminUser) {
                    history('/admin'); // Redirect to admin dashboard
                    console.log("this user is admin: ", email);
                } else {
                    setError('You do not have admin access.');
                }
            } else {
                history('/employee-dashboard'); // Redirect to employee dashboard
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setError('Login failed. Please check your credentials.'); // Set error message
        }
    };

    const checkIfAdmin = async (email) => {
        const adminEmails = ['admin@gmail.com']; // List of admin emails
        return adminEmails.includes(email); // Check if the email is in the admin list
    };

    // Styles for the component
    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f4f4f4', // Light gray background
            padding: '20px',
        },
        formContainer: {
            background: '#fff', // White background for form
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            width: '400px', // Set a fixed width for the form
            textAlign: 'center',
        },
        header: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: '700',
            color: '#333',
        },
        errorText: {
            color: '#e74c3c',
            marginTop: '10px',
        },
        input: {
            marginBottom: '20px',
            width: '100%',
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ddd',
        },
        button: {
            width: '100%',
            padding: '12px',
            borderRadius: '5px',
            border: 'none',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            fontSize: '16px',
            fontWeight: '600',
        },
        roleLabel: {
            marginRight: '20px',
            fontSize: '16px',
            color: '#555',
        },
        radioGroup: {
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-around',
        },
        registerButton: {
            marginTop: '10px',
            padding: '12px',
            borderRadius: '5px',
            border: 'none',
            background: '#28a745',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            fontSize: '16px',
            fontWeight: '600',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.header}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.input}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div style={styles.radioGroup}>
                        <label style={styles.roleLabel}>
                            <input
                                type="radio"
                                name="role"
                                value="employee"
                                checked={!isAdmin}
                                onChange={() => setIsAdmin(false)}
                            />
                            Employee
                        </label>
                        <label style={styles.roleLabel}>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(true)}
                            />
                            Admin
                        </label>
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                    {error && <p style={styles.errorText}>{error}</p>}
                </form>
                <button
                    style={styles.registerButton}
                    onClick={() => history('/register')}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;
