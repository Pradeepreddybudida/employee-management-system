// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');

const app = express.Router();
const db = require('../firebase'); //
// Middleware
// To parse JSON bodies

// Add Employee
app.post('/employees', async (req, res) => {
   // console.log("in post api employees")
    try {
        const { id,name, position, salary } = req.body;
        const employeeRef = await db.collection('employees').add({
            id,
            name,
            position,
            salary,
            createdAt: new Date(),
        });
        res.status(201).json({ id: employeeRef.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// Get All Employees
app.get('/employees', async (req, res) => {
    //console.log("in emp api get")
    try {
        const snapshot = await db.collection('employees').get();
        const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //console.log("employees : ", employees);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// Update Employee
app.put('/employees/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, position, salary } = req.body;

        // Update employee details in Firestore
        await db.collection('employees').doc(uid).update({
            name,
            position,
            salary,
        });

        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
});


// Delete Employee
app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('employees').doc(id).delete();
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});
// Add Attendance
app.post('/attendance', async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;
        const attendanceRef = await db.collection('attendance').add({
            employeeId,
            date,
            status,
            createdAt: new Date(),
        });
        res.status(201).json({ id: attendanceRef.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add attendance' });
    }
});

// Get Attendance Records
app.get('/attendance', async (req, res) => {
    try {
        const snapshot = await db.collection('attendance').get();
        const attendanceRecords = [];

        for (const doc of snapshot.docs) {
            const record = doc.data();
            const employeeId = record.employeeId; // Assuming employeeId is the uid of the employee
             console.log("emp id : ", employeeId)
            if (employeeId) {
                // Get employee details directly using the uid
                const employeeDoc = await db.collection('employees').doc(employeeId).get();
              //  console.log("empdoc : ", employeeDoc)
                if (employeeDoc.exists) {
                    const employeeName = employeeDoc.data().name;
                    console.log("empname in get : ", employeeName)
                    // Combine attendance record with employee details
                    attendanceRecords.push({
                        id: doc.id,
                        employeeName,
                        ...record,
                    });
                } else {
                    // If no matching employee found, set employeeName to "Unknown"
                    attendanceRecords.push({
                        id: doc.id,
                        employeeName: "Unknown",
                        ...record,
                    });
                }
            } else {
                // If employeeId is missing, add the attendance record without employee details
                attendanceRecords.push({
                    id: doc.id,
                    employeeName: "Unknown",
                    ...record,
                });
            }
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
});





// Add Payroll
app.post('/payroll', async (req, res) => {
    try {
        const { employeeId, amount, date } = req.body;
        const payrollRef = await db.collection('payroll').add({
            employeeId,
            amount,
            date,
            createdAt: new Date(),
        });
        res.status(201).json({ id: payrollRef.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add payroll' });
    }
});

// Get Payroll Records
app.get('/payroll', async (req, res) => {
    try {
        // Fetch payroll records
        const snapshot = await db.collection('payroll').get();
        const payrollRecords = await Promise.all(snapshot.docs.map(async (doc) => {
            const payrollData = { id: doc.id, ...doc.data() };
            const employeeId = payrollData.employeeId; // This is the employee UID in the payroll document

            if (employeeId) {
                // Fetch employee data directly using the UID
                const employeeDoc = await db.collection('employees').doc(employeeId).get();

                if (employeeDoc.exists) {
                    payrollData.employeeName = employeeDoc.data().name; // Assuming 'name' is a field in employees
                } else {
                    payrollData.employeeName = 'Unknown'; // Fallback if employee does not exist
                }
            } else {
                payrollData.employeeName = 'Unknown'; // Fallback if employeeId is not provided
            }

            return payrollData;
        }));

        res.status(200).json(payrollRecords);
    } catch (error) {
        console.error('Error fetching payroll records:', error);
        res.status(500).json({ error: 'Failed to fetch payroll records' });
    }
});




module.exports = app;