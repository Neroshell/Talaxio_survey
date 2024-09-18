import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';

// Define the type for formData and setFormData


const FuelEmissions: React.FC = () => {
 

  return (
    <div className="form-container">
      <FormControl component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Are you worried about fuel emissions?</FormLabel>
        <RadioGroup
          aria-label="fuel-emissions"
          name="fuel-emissions"
          value={''}
         
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default FuelEmissions;
