import React from 'react';
import { TextField, Typography } from '@mui/material';
import './components.css'; // Import your CSS file


const FamilyCars = () => {

  return (
    <div className="form-container">
      <Typography variant="h6" gutterBottom>
        How many cars do you have in your family?
      </Typography>

      <TextField
        fullWidth
        label="Number of cars"
        type="number"
        inputProps={{ min: '0' }}
       
      />

      
    </div>
  );
};

export default FamilyCars;
