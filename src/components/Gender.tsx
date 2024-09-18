import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import './components.css'; // Import your CSS file

const Gender: React.FC = () => {
  return (
    <div className="form-container">
      <FormControl style={{ width: '50%', margin: '0 auto'}} component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>Select your gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          {/* Add more options if needed */}
        </RadioGroup>
      </FormControl>

      
    </div>
  );
};

export default Gender;
