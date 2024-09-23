import React, { useState, useContext } from 'react';
import { FormControl, FormLabel, MenuItem, Select, Button, FormHelperText, SelectChangeEvent } from '@mui/material';
import { multiStepContext } from './ContextStep'; 
import './components.css'; 

interface DriveTrainProps {
  onNext: (driveTrain: string) => void; 
}

const DriveTrain: React.FC<DriveTrainProps> = ({ onNext }) => {  
  const { currentStep, setStep, userData, setUserData } = useContext(multiStepContext); 
  const [error, setError] = useState<string | null>(null);

  // Update the drivetrain preference in the context
  const handleDrivetrainChange = (event: SelectChangeEvent<string>) => {
    const drivetrain = event.target.value;
    setUserData({ ...userData, drivetrain }); // Update context with drivetrain preference
    setError(null); // Clear error when valid input is selected
  };

  const handleNext = () => {
    if (!userData.drivetrain) {
      setError('Please select a drivetrain.');
      return;
    }
    // Call onNext prop function to handle the drivetrain response
    onNext(userData.drivetrain);

    // Move to the next step
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setStep(currentStep - 1); // Move to the previous step
  };

  return (
    <div className="form-container">
      <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
        <FormLabel sx={{ fontWeight: 'bold' }}>Which drivetrain do you prefer?</FormLabel>
        <Select
          sx={{ height: '40px' }}
          value={userData.drivetrain || ''} // Controlled input from context
          onChange={handleDrivetrainChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="fwd">FWD</MenuItem>
          <MenuItem value="rwd">RWD</MenuItem>
          <MenuItem value="unknown">I don't know</MenuItem>
        </Select>
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
          disabled={!userData.drivetrain}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DriveTrain;
