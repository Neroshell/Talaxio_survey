import React, { useState, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

interface FuelEmissionsProps {
  onNext: (fuelEmissions: string) => void; // Add onNext prop type
}

const FuelEmissions: React.FC<FuelEmissionsProps> = ({ onNext }) => {
  const { currentStep, setStep, userData, setUserData } = useContext(multiStepContext); // Access context
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    setUserData({ ...userData, fuelEmissions: selectedOption }); // Update context with selected option
    setError(null); // Clear the error when a valid option is selected
  };

  const handleNext = () => {
    if (!userData.fuelEmissions) {
      setError('Please select an option.');
      return;
    }
    onNext(userData.fuelEmissions); // Call onNext with the selected option
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
          value={userData.fuelEmissions || ''} // Controlled input from context
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
          disabled={!userData.fuelEmissions} // Disable if no option is selected
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FuelEmissions;
