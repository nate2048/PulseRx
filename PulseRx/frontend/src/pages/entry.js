import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function BloodMarkerForm() {
  const [bloodMarkers, setBloodMarkers] = useState([{ name: '', value: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newBloodMarkers = [...bloodMarkers];
    newBloodMarkers[index][name] = value;
    setBloodMarkers(newBloodMarkers);
  };

  const addBloodMarker = () => {
    setBloodMarkers([...bloodMarkers, { name: '', value: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/tests', { blood_markers: bloodMarkers });
      alert('Blood markers submitted successfully!');
    } catch (error) {
      console.error('Error submitting blood markers:', error);
      alert('An error occurred while submitting blood markers.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {bloodMarkers.map((bloodMarker, index) => (
        <div key={index}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={bloodMarker.name}
            onChange={(event) => handleInputChange(index, event)}
          />
          <label>Value:</label>
          <input
            type="text"
            name="value"
            value={bloodMarker.value}
            onChange={(event) => handleInputChange(index, event)}
          />
        </div>
      ))}
      <button type="button" onClick={addBloodMarker}>Add Blood Marker</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BloodMarkerForm;
