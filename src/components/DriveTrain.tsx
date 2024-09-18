import React, { useState, useContext } from 'react';
import { FormControl, FormLabel, MenuItem, Select, TextField, Button, FormHelperText, SelectChangeEvent } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary
import './components.css'; // Import your CSS file

const DriveTrain: React.FC = () => {
  const { currentStep, setStep } = useContext(multiStepContext);
  const [drivetrain, setDrivetrain] = useState<string | null>(null);
  const [familyCars, setFamilyCars] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  // Update the event type to SelectChangeEvent
  const handleDrivetrainChange = (event: SelectChangeEvent) => {
    setDrivetrain(event.target.value as string);
    setError(null); // Clear error when valid input is selected
  };

  const handleFamilyCarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCars(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleNext = () => {
    if (!drivetrain || familyCars === '') {
      setError('Please complete all fields.');
      return;
    }
    setStep(currentStep + 1); // Move to the next step
  };

  const handleBack = () => {
    setStep(currentStep - 1); // Move to the previous step
  };

  return (
    <div className="form-container">
      <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
        <FormLabel sx={{ fontWeight: 'bold' }}>Which drivetrain do you prefer?</FormLabel>
        <Select
          sx={{ height: '40px'}}
          value={drivetrain || ''}
          onChange={handleDrivetrainChange} // Correct type applied
          variant="outlined"
          fullWidth
        >
          <MenuItem value="fwd">FWD</MenuItem>
          <MenuItem value="rwd">RWD</MenuItem>
          <MenuItem value="unknown">I don't know</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>How many cars do you have in your family?</FormLabel>
        <TextField
          type="number"
          value={familyCars}
          onChange={handleFamilyCarsChange}
          variant="outlined"
          fullWidth
          InputProps={{ inputProps: { min: 0 } }} // Prevent negative numbers
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
          disabled={!drivetrain || familyCars === ''}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DriveTrain;
