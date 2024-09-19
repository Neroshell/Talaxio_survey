import React, { useState, useContext } from 'react';
import { TextField, Button, FormHelperText, FormControl } from '@mui/material';
import { multiStepContext } from './ContextStep';

interface AgeProps {
  onNext: (age: number | '') => void; // onNext prop for handling age submission
}

const Age: React.FC<AgeProps> = ({ onNext }) => {
  const { userData, setUserData } = useContext(multiStepContext);
  const [age, setAge] = useState<number | ''>(userData['age'] || ''); // Initial age from context
  const [error, setError] = useState<string | null>(null);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const ageValue = Number(value);

    if (value === '') {
      setAge('');
      setError(null);
    } else if (ageValue < 1 || ageValue > 100) {
      setAge(ageValue);
      setError('Age must be between 1 and 100');
    } else {
      setAge(ageValue);
      setError(null);
      setUserData({ ...userData, age: ageValue }); // Update age in context
    }
  };

  const handleNextClick = () => {
    if (error === null) {
      onNext(age); // Call onNext with the current age value
    }
  };

  return (
    <>
      <div className="form-container">
        <FormControl fullWidth sx={{ width: '50%', margin: '0 auto' }}>
          <TextField 
            label="How old are you" 
            variant="outlined" 
            type="number" 
            value={age} // Controlled input for age
            onChange={handleAgeChange} // Updates age and context
            error={Boolean(error)} 
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ marginRight: '10px' }}
          disabled
        >
          Back
        </Button>

        <Button
          variant="contained"
          disabled={Boolean(error)}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Age;
