import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import './components.css'; // Import your CSS file

const DriveTrain: React.FC = () => {
  return (
    <div className="form-container">
      <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
        <FormLabel sx={{ fontWeight: 'bold' }}>Which drivetrain do you prefer?</FormLabel>
        <Select
          sx={{ height: '40px'}}
          defaultValue=""
          variant="outlined"
          fullWidth
        >
          <MenuItem value="fwd">FWD</MenuItem>
          <MenuItem value="rwd">RWD</MenuItem>
          <MenuItem value="unknown">I dont know</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{width: '50%', margin: '0 auto'}} component="fieldset" >
        <FormLabel sx={{ fontWeight: 'bold' }}>Are you worried about fuel emissions?</FormLabel>
        <RadioGroup
          aria-label="fuel-emissions"
          defaultValue=""
          name="fuel-emissions"
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl  component="fieldset">
        <FormLabel sx={{ fontWeight: 'bold' }}>How many cars do you have in your family?</FormLabel>
        <TextField
       
          type="number"
          variant="outlined"
          fullWidth
         
          InputProps={{ inputProps: { min: 0 } }} // Prevent negative numbers
        />
      </FormControl>
    </div>
  );
}

export default DriveTrain;
