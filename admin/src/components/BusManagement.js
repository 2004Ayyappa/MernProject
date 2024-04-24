import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/BusManagement.css'; // Import CSS file for styling
import DashboardLayout from './dashboard';
function BusManagement() {
  const [buses, setBuses] = useState([]);
  const [newBusData, setNewBusData] = useState({
    companyname: '',
    from: '',
    to: '',
    price:'' ,
    email: '',
    phone: '',
    amenities: '',
    rating: '',
    arrival: '',
    departure: '',
    seats: []
  });

  useEffect(() => {
    fetchAllBuses();
    
  }, []);

  const fetchAllBuses = async () => {
    try {
      const response = await axios.post('http://localhost:8080/bus/getall');
      if (Array.isArray(response.data)) {
        setBuses(response.data);
      } else {
        console.error('Data received from server is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching buses:', error.message);
    }
  };

  const addNewBus = async () => {
    try {
      const response = await axios.post('http://localhost:8080/bus/addnew', newBusData);
      if (response.data && typeof response.data === 'object') {
        setBuses([...buses, response.data]);
        setNewBusData({
          companyname: '',
          from: '',
          to: '',
          price: 0,
          email: '',
          phone: '',
          amenities: '',
          rating: 0,
          arrival: '',
          departure: '',
          seats: []
        });
      } else {
        console.error('Invalid response received from server:', response.data);
      }
    } catch (error) {
      console.error('Error adding new bus:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusData({ ...newBusData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addNewBus(); // Call addNewBus function to add the new bus
  };


  return (
  <DashboardLayout>
    <div className="bus-management-container">
      <h2>Bus Management</h2>

      <form onSubmit={handleSubmit} className="new-bus-form">
        <h3>Add New Bus</h3>
        <div className="form-group">
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={newBusData.companyname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="from"
            placeholder="From"
            value={newBusData.from}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="to"
            placeholder="To"
            value={newBusData.to}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBusData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newBusData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newBusData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="amenities"
            placeholder="Amenities"
            value={newBusData.amenities}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newBusData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="arrival"
            placeholder="Arrival Time"
            value={newBusData.arrival}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="departure"
            placeholder="Departure Time"
            value={newBusData.departure}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Other input fields for new bus data */}

        <button type="submit">Add Bus</button>
      </form>

      <div className="all-buses">
        <h3>All Buses</h3>
        <ul>
          {buses.map((bus) => (
            <li key={bus._id}>
              <div>
                <strong>Company Name:</strong> {bus.companyname}
              </div>
              <div>
                <strong>From:</strong> {bus.from}
              </div>
              <div>
                <strong>To:</strong> {bus.to}
              </div>
              {/* Display other bus details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default BusManagement;

