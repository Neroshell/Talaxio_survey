// EachCar.tsx
import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Typography, SelectChangeEvent } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Assuming you're using multiStepContext for step management
import './components.css'; // Import your CSS file

interface EachCarProps {
  carIndex: number;
  onCarDetailsChange: (index: number, carMake: string, carModel: string) => void;
}

const carMakes = ['BMW', 'Toyota', 'Mercedes', 'Audi', 'Honda'];

const EachCar: React.FC<EachCarProps> = ({ carIndex, onCarDetailsChange }) => {
  const { currentStep, setStep } = useContext(multiStepContext); // Use context for step management
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCarMakeChange = (event: SelectChangeEvent) => {
    const selectedMake = event.target.value;
    setCarMake(selectedMake);
    setCarModel(''); // Reset car model when a new car make is selected
    setError(null); // Reset error if the make changes
    onCarDetailsChange(carIndex, selectedMake, ''); // Clear model on make change
  };

  const handleCarModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value;
    setCarModel(model);
    if (carMake === 'BMW' && !['X1', 'X3', 'X5', 'M3', 'M5', 'i8'].includes(model)) {
      setError('Please enter a valid BMW model.');
    } else {
      setError(null);
    }
    onCarDetailsChange(carIndex, carMake, model);
  };

  const handleNextClick = () => {
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
          value={carModel}
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
          disabled={!carMake || (carMake === 'BMW' && Boolean(error))}
          onClick={handleNextClick} // Updated function
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EachCar;
