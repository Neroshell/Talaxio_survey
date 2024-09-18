import React, { useState, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

const FuelEmissions: React.FC = () => {
  const { currentStep, setStep } = useContext(multiStepContext);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setError(null); // Clear the error when a valid option is selected
  };

  const handleNext = () => {
    if (!selectedOption) {
      setError('Please select an option.');
      return;
    }
    setStep(currentStep + 1); // Move to the next step
  };

  const handleBack = () => {
    setStep(currentStep - 1); // Move to the previous step
  };

  return (
    <div className="form-container">
      <FormControl component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Are you worried about fuel emissions?</FormLabel>
        <RadioGroup
          aria-label="fuel-emissions"
          name="fuel-emissions"
          value={selectedOption || ''}
          onChange={handleOptionChange}
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
          disabled={!selectedOption} // Disable if no option is selected
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FuelEmissions;
