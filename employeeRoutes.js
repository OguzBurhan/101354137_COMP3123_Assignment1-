const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/employeeModel');

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create a new employee
router.post('/employees', async (req, res) => {
    try {
        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await employee.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get a specific employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update an employee
router.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete an employee
router.delete('/employees/:eid', async (req, res) => {
    try {
        const result = await Employee.findByIdAndDelete(req.params.eid);
        if (!result) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(204).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;

