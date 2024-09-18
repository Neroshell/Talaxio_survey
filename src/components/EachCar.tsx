import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Typography, SelectChangeEvent } from '@mui/material';
import './components.css'; // Import your CSS file

const carMakes = ['BMW', 'Toyota', 'Mercedes', 'Audi', 'Honda'];

const EachCar: React.FC = () => {
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCarMakeChange = (event: SelectChangeEvent) => {
    const selectedMake = event.target.value;
    setCarMake(selectedMake);
    setCarModel(''); // Reset the car model when a new car make is selected
    setError(null); // Reset error if the make changes
  };

  const handleCarModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value;
    setCarModel(model);
    
    if (carMake === 'BMW' && !['X1', 'X3', 'X5', 'M3', 'M5', 'i8'].includes(model)) {
      setError('Please enter a valid BMW model.');
    } else {
      setError(null);
    }
  };

  return (
    <div className="form-container">
      <Typography variant="h6" gutterBottom>
        Car 1
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="outlined" color="secondary">
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!carMake || (carMake === 'BMW' && Boolean(error))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EachCar;
