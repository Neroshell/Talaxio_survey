import React, { useState } from 'react';
import { TextField, Button, FormHelperText, FormControl } from '@mui/material';

interface AgeProps {
  onNext: (age: number | '') => void; // Added onNext prop
}

const Age: React.FC<AgeProps> = ({ onNext }) => {
  const [age, setAge] = useState<number | ''>('');
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
            value={age} 
            onChange={handleAgeChange} 
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
