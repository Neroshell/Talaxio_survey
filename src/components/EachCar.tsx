import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Typography, SelectChangeEvent } from '@mui/material';
import { multiStepContext } from './ContextStep'; 

const carMakes = ['BMW', 'Toyota', 'Mercedes', 'Audi', 'Honda'];

interface EachCarProps {
  carIndex: number;
}

const EachCar: React.FC<EachCarProps> = ({ carIndex }) => {
  const { userData, setUserData, currentStep, setStep, submitData } = useContext(multiStepContext); // Use context for global state
  const [carMake, setCarMake] = useState(userData.eachCar?.[carIndex]?.carMake || ''); // Prepopulate with saved data
  const [carModel, setCarModel] = useState(userData.eachCar?.[carIndex]?.carModel || ''); // Prepopulate with saved data
  const [error, setError] = useState<string | null>(null);

  // Handle car make changes
  const handleCarMakeChange = (event: SelectChangeEvent) => {
    const selectedMake = event.target.value;
    setCarMake(selectedMake);
    setCarModel(''); // Reset car model
    setError(null); // Clear error

    // Update userData directly for the selected car index
    setUserData((prevUserData: any) => {
        const updatedCars = [...(prevUserData.eachCar || [])];
        updatedCars[carIndex] = { carMake: selectedMake, carModel: '' }; // Initialize model
        return { ...prevUserData, eachCar: updatedCars };
    });
};


  // Handle car model changes
  const handleCarModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value;
    setCarModel(model);

    // Validate BMW models
    if (carMake === 'BMW' && !['X1', 'X3', 'X5', 'M3', 'M5', 'i8'].includes(model)) {
      setError('Please enter a valid BMW model.');
    } else {
      setError(null); // Clear error if valid
    }

    // Update global userData with new car model
    setUserData((prevUserData: any) => {
      const updatedCars = [...(prevUserData.eachCar || [])];
      updatedCars[carIndex] = { ...updatedCars[carIndex], carMake, carModel: model };
      return { ...prevUserData, eachCar: updatedCars };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (!error) {
      setStep(currentStep + 1); // Move to the next step
    }
  };

  const handleBackClick = () => {
    setStep(currentStep - 1); // Go back to the previous step
  };

  return (
    <div className="each-car-container">
      <Typography variant="h6" gutterBottom>
        Car {carIndex + 1}
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
          <InputLabel>Car Make</InputLabel>
          <Select
            value={carMake}
            onChange={handleCarMakeChange}
            label="Car Make"
          >
            {carMakes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {carMake && (
          <TextField
            fullWidth
            label={`Enter ${carMake} model`}
            value={carModel || ''} // Ensure default to empty string if no data
            onChange={handleCarModelChange}
            error={Boolean(error)}
            helperText={error}
          />
        )}

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" onClick={handleBackClick} style={{ marginRight: '10px' }}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!carMake || (carMake === 'BMW' && Boolean(error))} // Disable if no car make or invalid BMW model
            onClick={submitData}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EachCar;
