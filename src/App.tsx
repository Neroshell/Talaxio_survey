// App.tsx
import React, { useContext } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import Age from './components/Age';
import Gender from './components/Gender';
import CarLicense from './components/CarLicense';
import FirstCar from './components/FirstCar';
import DriveTrain from './components/DriveTrain';
import FuelEmissions from './components/FuelEmissions';
import FamilyCars from './components/FamilyCars';
import ThankYou from './components/FinalThanks'; // Adjust the import path if necessary
import './App.css';
import { multiStepContext } from './components/ContextStep';

const steps = [
  'Age',
  'Gender',
  'Car License',
  'First Car',
  'Drive Train',
  'Fuel Emissions',
  'Family Cars',
  'Car Details',
  'Thank You'
];

function App() {
  const { currentStep, setStep } = useContext(multiStepContext);

  const handleAgeNext = (age: number | '') => {
    if (age === '') {
      return; // Do nothing if age is not set
    }
    if (age < 18) {
      setStep(8); // Go to Thank You step
    } else {
      setStep(1); // Go to Gender step
    }
  };

  const handleCarLicenseNext = (licenseStatus: string) => {
    if (licenseStatus === 'no') {
      setStep(8); // Go to Thank You step
    } else {
      setStep(3); // Go to First Car step
    }
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Age onNext={handleAgeNext} />;
      case 1:
        return <Gender />;
      case 2:
        return <CarLicense onNext={handleCarLicenseNext} />;
      case 3:
        return <FirstCar />;
      case 4:
        return <DriveTrain />;
      case 5:
        return <FuelEmissions />;
      case 6:
        return <FamilyCars />;
      case 7:
        return <ThankYou message='I appreciate' />;
      case 8:
        return <ThankYou message='You are under 18 or do not own a driving license. Thank you for participating!' />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className='main-box'>
      <Stepper style={{ width: '50%' }} activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} active={index === currentStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div style={{ width: "50%", margin: '0 auto' }} className="step-content">
        {getStepContent(currentStep)}
      </div>
    </div>
  );
}

export default App;
