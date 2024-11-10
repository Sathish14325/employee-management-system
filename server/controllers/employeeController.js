import Employee from "../models/employeeModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Fetch all employees
export const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// Create a new employee
export const createEmployee = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    // Create a new employee
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
});

// Update an employee by ID
export const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;

    const updateData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee", error });
  }
});

// Delete an employee by ID
export const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting Employee with ID:", id);

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

// check email already exist or not
export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  console.log(email);

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(200).json({ message: "Email is available" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
