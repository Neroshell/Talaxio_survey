import React, { useState, useContext } from 'react';
import { TextField, Typography, Button, FormControl, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary
import './components.css'; // Import your CSS file

const FamilyCars: React.FC = () => {
  const { currentStep, setStep } = useContext(multiStepContext);
  const [familyCars, setFamilyCars] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleFamilyCarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCars(event.target.value === '' ? '' : Number(event.target.value));
    setError(null); // Clear error when valid input is entered
  };

  const handleNext = () => {
    if (familyCars === '') {
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
          value={familyCars}
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
          disabled={familyCars === ''}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FamilyCars;
