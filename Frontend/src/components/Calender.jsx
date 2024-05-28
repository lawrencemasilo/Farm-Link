import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Calender.css'

export default function Calender({ selectedPlantDate, setSelectedPlantDate}) {

  const handleDateChange = (date) => {
    setSelectedPlantDate(date);
  };

  return (
    <div className="calender-container">
      <DatePicker
        selected={selectedPlantDate}
        onChange={handleDateChange}
        placeholderText="Select a date"
        dateFormat="MM/dd/yyyy"
        className="form-control"
      />
    </div>
  );
};

