import React, { useState } from 'react';
import { TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './components.css'; // Import your CSS file

interface CarDetailsProps {
  numberOfCars: number;
}

const validBMWModels = ['X1', 'X3', 'X5', 'M3', 'M5', 'i8']; // Add valid BMW models here

const CarDetails: React.FC<CarDetailsProps> = ({ numberOfCars }) => {
  const [carDetails, setCarDetails] = useState<{ make: string; model: string }[]>(
    Array(numberOfCars).fill({ make: '', model: '' })
  );

  const handleCarMakeChange = (index: number, value: string) => {
    const updatedCars = [...carDetails];
    updatedCars[index].make = value;
    setCarDetails(updatedCars);
  };

  const handleCarModelChange = (index: number, value: string) => {
    const updatedCars = [...carDetails];
    updatedCars[index].model = value;
    setCarDetails(updatedCars);
  };

  const validateBMWModel = (model: string) => {
    return validBMWModels.includes(model);
  };

  return (
    <div className="form-container">
      <Typography variant="h6" gutterBottom>
        Which car make and model do you drive?
      </Typography>

      {Array.from({ length: numberOfCars }, (_, index) => (
        <div key={index} className="car-detail">
          <FormControl fullWidth margin="normal">
            <InputLabel>Car Make</InputLabel>
            <Select
              value={carDetails[index].make}
              onChange={(e) => handleCarMakeChange(index, e.target.value as string)}
            >
              <MenuItem value="BMW">BMW</MenuItem>
              <MenuItem value="Toyota">Toyota</MenuItem>
              <MenuItem value="Mercedes">Mercedes</MenuItem>
              {/* Add more car makes as needed */}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Car Model"
            value={carDetails[index].model}
            onChange={(e) => handleCarModelChange(index, e.target.value)}
            error={carDetails[index].make === 'BMW' && !validateBMWModel(carDetails[index].model)}
            helperText={
              carDetails[index].make === 'BMW' && !validateBMWModel(carDetails[index].model)
                ? 'Please enter a valid BMW model.'
                : ''
            }
            margin="normal"
          />
        </div>
      ))}
    </div>
  );
};

export default CarDetails;
