import React, { useState, useContext } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button, FormHelperText } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

interface CarLicenseProps {
  onNext: (licenseStatus: string) => void;
}

const CarLicense: React.FC<CarLicenseProps> = ({ onNext }) => {
  // Import both currentStep and setStep from the context
  const { currentStep, setStep } = useContext(multiStepContext);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLicenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLicense(event.target.value);
    setError(null); // Clear error when a valid option is selected
  };

  const handleNext = () => {
    if (!selectedLicense) {
      setError('Please select an option.');
      return;
    }
    onNext(selectedLicense); // Call the onNext handler with the selected value
  };

  const handleBack = () => {
    // Move to the previous step using setStep from the context
    setStep(currentStep - 1);
  };

  return (
    <div className="form-container">
      <FormControl style={{ width: '50%', margin: '0 auto' }} component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Do you own a car driving license?</FormLabel>
        <RadioGroup
          aria-label="driving-license"
          name="driving-license"
          value={selectedLicense || ''}
          onChange={handleLicenseChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="other" control={<Radio />} label="I prefer using other transport" />
        </RadioGroup>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ marginRight: '10px' }}
          onClick={handleBack} // Handle going back to the previous step
          disabled={currentStep <= 0}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!selectedLicense} // Disable the button if no option is selected
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CarLicense;
