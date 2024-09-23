import React, { useState, useContext } from 'react';
import { TextField, Typography, Button, FormControl, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; 
import './components.css'; 

const FamilyCars: React.FC = () => {
  const { currentStep, setStep, userData, setUserData } = useContext(multiStepContext); // Access context
  const [error, setError] = useState<string | null>(null);

  const handleFamilyCarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfCars = event.target.value === '' ? '' : Number(event.target.value);
    setUserData({ ...userData, familyCars: numberOfCars }); // Update context with number of family cars
    setError(null); // Clear error when valid input is entered
  };

  const handleNext = () => {
    if (userData.familyCars === '') {
      setError('Please enter the number of cars.');
      return;
    }
    setStep(currentStep + 1); // Move to the next step
  };

  const handleBack = () => {
    setStep(currentStep - 1); // Move to the previous step
  };

  return (
    <div className="form-container">
      <Typography variant="h6" gutterBottom>
        How many cars do you have in your family?
      </Typography>

      <FormControl fullWidth>
        <TextField
          label="Number of cars"
          type="number"
          value={userData.familyCars !== null ? userData.familyCars : ''} // Controlled input from context
          onChange={handleFamilyCarsChange}
          inputProps={{ min: '0' }} // Prevent negative numbers
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={currentStep <= 0}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={userData.familyCars === ''} // Disable if no number of cars is entered
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FamilyCars;
