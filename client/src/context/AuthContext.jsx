// AuthContext.js
import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth"; // base URL

export const AuthProvider = ({ children }) => {
  const register = (email, password) => {
    return axios.post(`${API_URL}/register`, { email, password });
  };

  const login = async (email, password) => {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    // Store user role in localStorage
    localStorage.setItem("role", response.data.role);
    return response;
  };

  const logout = async () => {
    try {
      // Send a logout request to the server
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      // Clear localStorage
      localStorage.removeItem("role");
      // Optional: Redirect to login or home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // check the logged admin to access in dashboard
  const getDashboard = () => {
    return axios.get(`${API_URL}/dashboard`, { withCredentials: true });
  };

  // check the logged admin to access in employee list
  const getEmployeeListAccess = () => {
    return axios.get(`${API_URL}/employees-list`, { withCredentials: true });
  };

  // check the logged admin to access in create employee page
  const getCreteEmployeeAccess = () => {
    return axios.get(`${API_URL}/create-employee`, { withCredentials: true });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        getDashboard,
        logout,
        getEmployeeListAccess,
        getCreteEmployeeAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
