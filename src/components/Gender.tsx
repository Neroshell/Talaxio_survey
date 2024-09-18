import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

const Gender: React.FC = () => {
  const { currentStep, setStep } = useContext(multiStepContext);
  const [selectedGender, setSelectedGender] = useState<string | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGender(event.target.value as string);
    setError(null); // Clear error when a valid option is selected
  };

  const handleNext = () => {
    if (!selectedGender) {
      setError('Please select a gender.');
      return;
    }
    // Move to the next step
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    // Move to the previous step
    setStep(currentStep - 1);
  };

  return (
    <div className="form-container">
      <FormControl fullWidth style={{ width: '50%', margin: '0 auto' }} error={!!error}>
        <InputLabel id="gender-select-label">Select your gender</InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          value={selectedGender}
          onChange={handleGenderChange}
          label="Select your gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="non-binary">Non-binary</MenuItem>
          <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ marginRight: '10px' }}
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!selectedGender}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Gender;
