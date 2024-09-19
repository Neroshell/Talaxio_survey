import React, { useState, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

interface FirstCarProps {
  onNext: () => void; // Define the type of the onNext prop
}

const FirstCar: React.FC<FirstCarProps> = ({ onNext }) => {
  const { currentStep, setStep, userData, setUserData } = useContext(multiStepContext); // Access context
  const [error, setError] = useState<string | null>(null);

  const handleFirstCarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const firstCar = event.target.value;
    setUserData({ ...userData, firstCar }); // Update context with selected first car status
    setError(null); // Clear error when a valid option is selected
  };

  const handleNext = () => {
    if (!userData.firstCar) {
      setError('Please select an option.');
      return;
    }

    if (userData.firstCar === 'yes') {
      // Update the context or do any additional logic here if needed
      onNext(); // Call the onNext function passed as a prop
      setStep(8); // Go to Thank You step if 'Yes' is selected
    } else if (userData.firstCar === 'no') {
      // Update the context or do any additional logic here if needed
      onNext(); // Call the onNext function passed as a prop
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
          value={userData.firstCar || ''} // Controlled input from context
          onChange={handleFirstCarChange} // Update context with the selected value
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
          disabled={!userData.firstCar} // Disable the button if no option is selected
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FirstCar;
