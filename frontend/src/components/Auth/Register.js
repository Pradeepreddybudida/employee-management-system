// src/components/Auth/Registration.js
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase'; // Assuming you've exported your Firestore db instance
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const history = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user info in Firestore
            await setDoc(doc(db, 'employees', user.uid), {
                name,
                position,
                salary: parseInt(salary, 10), // Store salary as an integer
                createdAt: new Date()
            });

            history('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error("Error registering: ", error);
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '600px',
        margin: '30px auto',
        padding: '30px',
        //backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    };

    const labelStyle = {
        fontWeight: '500',
        color: '#555',
    };

    const inputStyle = {
        borderRadius: '5px',
        border: '1px solid #ccc',
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        fontWeight: '600',
        padding: '10px 15px',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '100%',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'none',
        marginTop: '15px',
        display: 'block',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        style={inputStyle}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        style={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label style={labelStyle}>Name</label>
                    <input
                        type="text"
                        style={inputStyle}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label style={labelStyle}>Position</label>
                    <input
                        type="text"
                        style={inputStyle}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label style={labelStyle}>Salary</label>
                    <input
                        type="number"
                        style={inputStyle}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Register
                </button>
                <a href="#" style={linkStyle} onClick={() => history('/login')}>Already have an account? Login</a>
            </form>
        </div>
    );
};

export default Registration;
