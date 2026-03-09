import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StateSelector = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/State/states`);
      setStates(res.data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select a State</h2>
      <select value={selectedState} onChange={handleChange}>
        <option value="">-- Select State --</option>
        {states.map((state) => (
          <option key={state._id} value={state._id}>
            {state.name}
          </option>
        ))}
      </select>

      {selectedState && (
        <p style={{ marginTop: '10px' }}>
          ✅ Selected State ID: <strong>{selectedState}</strong>
        </p>
      )}
    </div>
  );
};

export default StateSelector;
