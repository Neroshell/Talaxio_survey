import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import './components.css'; // Import your CSS file

const CarLicense: React.FC = () => {
  return (
    <div className="form-container">
      <FormControl sx={{width: '50%', margin: '0 auto'}} component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Do you own a car driving license?</FormLabel>
        <RadioGroup
          aria-label="driving-license"
          defaultValue=""
          name="driving-license"
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="other" control={<Radio />} label="I prefer using other transport" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default CarLicense;
