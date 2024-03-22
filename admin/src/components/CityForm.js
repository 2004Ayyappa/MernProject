import React, { useState } from "react";
import axios from "axios";

const CityForm = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/city/addcity", {
        name,
        state
     
      });
      console.log("City added successfully:", response.data);
      alert("City added successfully")
      setName("");
      setState("");
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="City Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button type="submit">Add City</button>
    </form>
  );
};

export default CityForm;
