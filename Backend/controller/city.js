const City = require('../models/City');



exports.getAllcity = async (req, res) => {
  try {
    const city = await City.find({});
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching city', error });
  }
};




exports.addCity = async (req, res) => {
  try {
    const data = req.body; 
    await City.insertMany(data);
    res.status(201).json({ message: 'City inserted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting CIty', error });
  }
};




