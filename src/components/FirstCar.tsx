
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import './components.css'; // Import your CSS file

const FirstCar = () => {
  return (
    <>
      <div className="form-container">
        <FormControl sx={{width: '50%', margin: '0 auto'}} component="fieldset">
          <FormLabel sx={{ fontWeight: 'bold' }}>Is this your first car?</FormLabel>
          <RadioGroup
            aria-label="first-car"
            defaultValue=""
            name="first-car"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

          
       
      </div>
    </>
  );
}

export default FirstCar;
