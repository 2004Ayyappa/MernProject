const express = require("express");
const BusModel = require("../models/bus.model");

const app = express.Router();

app.post("/addnew", async (req, res) => {
  // console.log(req.body);
  try {
    let newbus = await BusModel.create({ ...req.body });
    // console.log(newbus);
    return res.send(newbus);
  } catch (error) {
    return res.send(error.message);
  }
});

app.post('/bus/update/:id', async (req, res) => {
  try {
    const busId = req.params.id;
    const updateData = req.body;

    // Find the bus by id and update it with the new data
    const updatedBus = await Bus.findByIdAndUpdate(busId, updateData, { new: true });

    if (updatedBus) {
      res.status(200).json(updatedBus);
    } else {
      res.status(404).send('Bus not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post("/getall", async (req, res) => {
  // console.log(req.body);
  try {
    // Fetch all buses from the database
    const buses = await BusModel.find();
    res.status(200).json(buses); // Send the fetched buses as JSON response
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Failed to fetch buses' }); // Send an error response
  }
  
});

app.get("/getall", async (req, res) => {
  // console.log(req.body);
  try {
    // Fetch all buses from the database
    const buses = await BusModel.find();
    res.status(200).json(buses); // Send the fetched buses as JSON response
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Failed to fetch buses' }); // Send an error response
  }
  
});
app.post("/one", async (req, res) => {
  // console.log("hi");
  try {
    let bus = await BusModel.find({ _id: req.body.id });
    return res.send(bus);
  } catch (error) {
    return res.send(error.message);
  }
});
// Route to get the count of all buses
app.get("/count", async (req, res) => {
  try {
    const busCount = await BusModel.countDocuments();
    res.status(200).json({ count: busCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = app;
