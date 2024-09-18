import React, { useState, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

const FirstCar: React.FC = () => {
  const { currentStep, setStep } = useContext(multiStepContext);
  const [selectedFirstCar, setSelectedFirstCar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFirstCarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFirstCar(event.target.value);
    setError(null); // Clear error when a valid option is selected
  };

  const handleNext = () => {
    if (!selectedFirstCar) {
      setError('Please select an option.');
      return;
    }

    if (selectedFirstCar === 'yes') {
      setStep(8); // Go to Thank You step if 'Yes' is selected
    } else if (selectedFirstCar === 'no') {
      setStep(currentStep + 1); // Go to DriveTrain step if 'No' is selected
    }
  };

  const handleBack = () => {
    // Move to the previous step
    setStep(currentStep - 1);
  };

  return (
    <div className="form-container">
      <FormControl sx={{width: '50%', margin: '0 auto'}} component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Is this your first car?</FormLabel>
        <RadioGroup
          aria-label="first-car"
          name="first-car"
          value={selectedFirstCar || ''}
          onChange={handleFirstCarChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ marginRight: '10px' }}
          onClick={handleBack}
          disabled={currentStep <= 0}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!selectedFirstCar}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FirstCar;
