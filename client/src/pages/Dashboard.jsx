import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { getDashboard, logout } = useAuth();

  useEffect(() => {
    // Redirect to login if the user is not an admin
    if (localStorage.getItem("role") !== "admin") {
      alert("Access restricted to admin users only");
      navigate("/login");
      return;
    }

    getDashboard()
      .then((response) => setMessage(response.data.message))
      .catch(() => {
        setMessage("Unauthorized");
        logout();
        navigate("/login");
      });
  }, [navigate]);

  const notify = () => {
    toast("Create new Employee");
  };

  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h1 className="text-5xl font-bold">{message}</h1>
            <p className="py-6">
              Explore our Employee Management System, a powerful platform
              designed to streamline employee data,enhancing productivity and
              organizational efficiency.
            </p>
            <button className="btn btn-secondary btn-lg" onClick={notify}>
              <Link to={"/create-employee"}> Create new Employee</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
