import React, { useState, useEffect } from "react";
import axios from "axios";
import {error } from "../Utils/notification"; // Import success and error functions
import "../Styles/BusManagement.css"; // Import CSS file for styling
import DashboardLayout from "./DashboardLayout";
import { Link } from "react-router-dom";
const BusManagement = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const fetchAllBuses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bus/getall");
      if (Array.isArray(response.data)) {
        setBuses(response.data);
      } else {
        console.error("Data received from server is not an array:", response.data);
      }
    } catch (err) {
      console.error("Error fetching buses:", err.message);
      error("Failed to fetch buses. Please try again later.");
    }
  };

  return (
    
    <div className="dashboard">
        <DashboardLayout/>
      <div>
      <center><h3>List of Buses</h3></center>
          
          <table className="bus-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>From</th>
                <th>To</th>
                {/* Add additional table headers for other bus details */}
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id}>
                  <td>{bus.companyname}</td>
                  <td>{bus.from}</td>
                  <td>{bus.to}</td>
                  {/* Add additional table cells for other bus details */}
                </tr>
              ))}
            </tbody>
          </table>
          
       <br></br>
        <center>
        <Link to="/allbuses">   <button type="submit">Add New Buses</button>
       </Link>
        
        </center>
      </div>
      </div>
  );
};

export default BusManagement;