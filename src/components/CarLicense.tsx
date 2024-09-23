import React, { useState, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep';

interface CarLicenseProps {
  onNext: (licenseStatus: string) => void; // Define the prop type
}

const CarLicense: React.FC<CarLicenseProps> = ({ onNext }) => {
  const { currentStep, setStep, userData, setUserData } = useContext(multiStepContext); // Access context
  const [error, setError] = useState<string | null>(null);

  const handleLicenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const licenseStatus = event.target.value;
    setUserData({ ...userData, carLicense: licenseStatus }); // Store selected license in context
    setError(null); // Clear error when a valid option is selected
  };

  const handleNext = () => {
    if (!userData.carLicense) {
      setError('Please select an option.');
      return;
    }
    // Use onNext prop to handle step transition logic
    onNext(userData.carLicense);
  };

  const handleBack = () => {
    // Move to the previous step
    setStep(currentStep - 1);
  };

  return (
    <div className="form-container">
      <FormControl style={{ width: '50%', margin: '0 auto' }} component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Do you own a car driving license?</FormLabel>
        <RadioGroup
          aria-label="driving-license"
          name="driving-license"
          value={userData.carLicense || ''} // Controlled input from context
          onChange={handleLicenseChange} // Update license status in context
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No, I prefer public transport" />
         
        </RadioGroup>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ marginRight: '10px' }}
          onClick={handleBack} // Handle going back to the previous step
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!userData.carLicense} // Disable the button if no option is selected
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CarLicense;
