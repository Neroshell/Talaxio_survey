// Age.tsx
import React, { useState, useContext } from 'react';
import { TextField, Button, FormHelperText, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { multiStepContext } from './ContextStep'; // Adjust the import path if necessary

// Define the type for user data
interface UserData {
  age: number | '';
  gender: string;
}

const Age: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const { userData, setUserData } = useContext(multiStepContext);
  const [age, setAge] = useState<number | ''>(userData.age || '');
  const [gender, setGender] = useState<string>(userData.gender || '');
  const [ageError, setAgeError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const ageValue = Number(value);

    if (value === '') {
      setAge('');
      setAgeError(null);
    } else if (ageValue < 1 || ageValue > 100) {
      setAge(ageValue);
      setAgeError('Age must be between 1 and 100');
    } else {
      setAge(ageValue);
      setAgeError(null);
      // Explicitly type the prev parameter
      setUserData((prev: UserData) => ({ ...prev, age: ageValue }));
    }
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    setUserData((prev: UserData) => ({ ...prev, gender: selectedGender }));
    setGenderError(null);
  };

  const handleNextClick = () => {
    if (ageError === null && gender !== '') {
      onNext();
    } else {
      if (ageError) {
        setAgeError(ageError); // Preserve existing age error if any
      }
      if (!gender) {
        setGenderError('Please select a gender.');
      }
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
            error={Boolean(ageError)} 
          />
          {ageError && <FormHelperText error>{ageError}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth sx={{ width: '50%', margin: '0 auto', marginTop: '20px' }} error={Boolean(genderError)}>
          <InputLabel id="gender-select-label">Select your gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={gender}
            onChange={handleGenderChange}
            label="Select your gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="non-binary">Non-binary</MenuItem>
            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
          </Select>
          {genderError && <FormHelperText>{genderError}</FormHelperText>}
        </FormControl>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ marginRight: '10px' }}
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNextClick}
          disabled={Boolean(ageError) || !gender} // Disable next if age is invalid or gender is not selected
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Age;
