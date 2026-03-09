const State = require('../models/All_State_city');



exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find({});
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching states', error });
  }
};




exports.addStates = async (req, res) => {
  try {
    const data = req.body; 
    await State.insertMany(data);
    res.status(201).json({ message: 'States inserted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting states', error });
  }
};




