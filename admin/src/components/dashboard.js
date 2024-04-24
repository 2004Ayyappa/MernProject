// DashboardLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/DashboardLayout.css'; // Import CSS file for styling

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/busmanagement">Bus Management</Link></li>
          <li><Link to="/citymanagement">City Management</Link></li>
          <li><Link to="/usermanagement">User Management</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
