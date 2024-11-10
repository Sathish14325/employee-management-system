import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { getEmployeeListAccess } = useAuth();

  // check the role based authorization to enter into this page
  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      toast.warning("Access restricted to admin users only");
      navigate("/login");
      return;
    }

    getEmployeeListAccess()
      .then((response) => setMessage(response.data.message))
      .catch(() => {
        setMessage("Unauthorized");
        logout();
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // delete the item handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // update the item handler
  const handleEdit = (employeeData) => {
    navigate("/create-employee", { state: { employeeData } });
  };

  // Filter and sort employees based on searchTerm and sortField
  const filteredAndSortedEmployees = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "name" || sortField === "email") {
        return a[sortField].localeCompare(b[sortField]);
      } else if (sortField === "createdAt") {
        return new Date(a[sortField]) - new Date(b[sortField]);
      } else if (sortField === "_id") {
        return a._id.localeCompare(b._id);
      }
      return 0;
    });

  return (
    <main className="p-4">
      <div className="flex  flex-col items-center md:flex-row md:justify-between md:items-center gap-10">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div>
          <select
            className="input input-bordered"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="_id">Sort by ID</option>
            <option value="createdAt">Sort by Date</option>
          </select>
        </div>
        <div>
          <p className="text-3xl font-medium">
            Total: {filteredAndSortedEmployees.length}
          </p>
        </div>
        <div>
          <button className="btn btn-secondary btn-wide text-lg">
            <Link to={"/create-employee"}>Create Employee</Link>
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold my-4">Employee List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">S NO</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {"employee image"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.mobile}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.course}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(employee.createdAt), "dd-MM-yyyy")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default EmployeeList;
