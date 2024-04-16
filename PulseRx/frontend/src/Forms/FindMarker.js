import React, { useState } from 'react';

const SearchableInputForm = () => {
  const [bloodMarker, setBloodMarker] = useState('');
  const [value, setValue] = useState('');
  const [filteredBloodMarkers, setFilteredBloodMarkers] = useState([]);

  // List of available blood markers
  const availableBloodMarkers = [
    'Hemoglobin',
    'White Blood Cell Count',
    'Platelet Count',
      'Vitamin D',
      'Calcium'
    // Add more blood markers as needed
  ];

  // Function to handle blood marker selection
  const handleBloodMarkerChange = (e) => {
    setBloodMarker(e.target.value);
  };

  // Function to handle value input
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  // Function to filter blood markers based on user input
  const filterBloodMarkers = (input) => {
    const filtered = availableBloodMarkers.filter(marker =>
      marker.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBloodMarkers(filtered);
  };

  return (
    <div>
      <label htmlFor="blood-marker">Select Blood Marker:</label>
      <input
        type="text"
        id="blood-marker"
        value={bloodMarker}
        onChange={(e) => {
          setBloodMarker(e.target.value);
          filterBloodMarkers(e.target.value);
        }}
        placeholder="Search Blood Markers"
      />
      {filteredBloodMarkers.length > 0 && (
        <select value={bloodMarker} onChange={handleBloodMarkerChange}>
          <option value="">Select a Blood Marker</option>
          {filteredBloodMarkers.map((marker, index) => (
            <option key={index} value={marker}>
              {marker}
            </option>
          ))}
        </select>
      )}

      <label htmlFor="value">Enter Value:</label>
      <input
        type="text"
        id="value"
        value={value}
        onChange={handleValueChange}
        placeholder="Enter Value"
      />

      {/* Display selected blood marker and value */}
      {bloodMarker && value && (
        <div>
          <p>Selected Blood Marker: {bloodMarker}</p>
          <p>Entered Value: {value}</p>
        </div>
      )}
    </div>
  );
};

export default SearchableInputForm;
