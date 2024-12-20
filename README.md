# Employee Management System

**Built with MERN Stack** (MongoDB, Express.js, React.js, Node.js)

## Overview
The Employee Management System is a web application that streamlines employee record management. It enables authorized users to perform CRUD (Create, Read, Update, Delete) operations securely with role-based access.

## Key Features

- **Authentication and Authorization**
  - Utilizes **JWT (JSON Web Tokens)** for secure authentication.
  - **Role-based access control**: Only admin users can access the dashboard and perform employee CRUD operations.
  - Admin role stored in `localStorage` and cookies for authorization.

- **Admin-Only Features**
  - **Dashboard Access**: Only admins can view the dashboard.
  - **Employee Management**: Admins can create, update, list, and delete employee records.

- **User Interface**
  - **Theme Toggle**: Dark and light theme options for better user experience.
  - **Responsive Design**: Optimized for various devices (desktop, tablet, mobile).
  - **Search Functionality**: Search employees by name.
  - **Sorting Options**: Sort employees by email, ID, date, or name.
  - **Total Employee Count**: Displays total employees.

- **Protected Routes**: Pages are restricted based on user role, with access allowed only for admins.

## Technologies Used

- **Frontend**: React.js, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **UI**: Responsive design, theme toggle

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sathish14325/employee-management-system.git
   cd employee-management-system

2. **Install Dependencies**
   ```bash
   cd server
   npm install
    cd client
    npm install
3. **Environment Setup**
   - Set up environment variables for the backend:
   ```bash
     MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
4. **Run the Application**
   ```bash
   npm run dev
   npm start

To explore the app, please log in with the following credentials:

Email: admin1@gmail.com

Password: 12345

Email: sathish@gmail.com
password: 123456



## Conclusion

The Employee Management System is a comprehensive solution for managing employee records efficiently. By leveraging the MERN stack and implementing robust authentication and authorization with JWT, this application ensures data security while providing a seamless user experience. The admin-only access to sensitive features, along with responsive design, theme toggling, and search functionality, makes this system versatile and user-friendly. 

This project demonstrates the potential of MERN stack applications in creating scalable, secure, and interactive web applications suited for real-world use cases. Future enhancements could include additional user roles, advanced analytics, and integration with third-party services to extend its functionality even further.



