import React, { useState, useEffect } from "react";
import axios from "axios";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedState, setUpdatedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/city");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/city/deleteCity/${id}`);
      alert("City deleted successfully");
      fetchData(); // Refresh the list of cities after deletion
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/city/updateCity/${id}`, {
        name: updatedName,
        state: updatedState
      });
      alert("City updated successfully");
      setUpdatedName("");
      setUpdatedState("");
      fetchData(); // Refresh the list of cities after updating
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  return (
    <div>
      <h2>List of Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city._id}>
            {city.name}, {city.state}{" "}
            <button onClick={() => handleDelete(city._id)}>Delete</button>
            <button onClick={() => setSelectedCity(city)}>Update</button>
          </li>
        ))}
      </ul>

      {/* Update Form */}
      {selectedCity && (
        <div>
          <h3>Update City</h3>
          <input
            type="text"
            placeholder="New City Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            placeholder="New State"
            value={updatedState}
            onChange={(e) => setUpdatedState(e.target.value)}
          />
          <button onClick={() => handleUpdate(selectedCity._id)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default CityList;
