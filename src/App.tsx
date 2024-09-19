// App.tsx
import React, { useContext, useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import Age from './components/Age';
import CarLicense from './components/CarLicense';
import FirstCar from './components/FirstCar';
import DriveTrain from './components/DriveTrain';
import FuelEmissions from './components/FuelEmissions';
import FamilyCars from './components/FamilyCars';
import ThankYou from './components/FinalThanks';
import EachCar from './components/EachCar';
import './App.css';
import { multiStepContext } from './components/ContextStep';

const steps = [
  'Age',
  'Car License',
  'First Car',
  'Drive Train',
  'Fuel Emissions',
  'Family Cars',
  'Car Details',
  'Thank You'
];

function App() {
  const { currentStep, setStep, userData, setUserData } = useContext(multiStepContext); // Access context
  const [thankYouMessage, setThankYouMessage] = useState<string | null>(null);
  const [showIcon, setShowIcon] = useState<boolean>(true);

  // Handle Age Step Logic
  const handleAgeNext = () => {
    const { age } = userData;
    if (age === '' || isNaN(age as number)) {
      return; // Do nothing if the age is not provided or invalid
    }
    if (age < 18) {
      setThankYouMessage("Thank you for your interest");
      setShowIcon(false); // Optionally hide the icon
      setStep(7); // Go to Thank You step if under 18
    } else {
      setStep(1); // Proceed to Car License step for age >= 18
    }
  };

  // Handle Car License Step Logic
  const handleCarLicenseNext = (licenseStatus: string) => {
    if (licenseStatus === 'no') {
      setThankYouMessage("Thank you for your interest");
      setShowIcon(true); // Optionally hide the icon
      setStep(7); // Go to Thank You step if no license or prefer transport
    } else if (userData.age !== null && userData.age >= 18 && userData.age <= 25) {
      setStep(2); // Go to First Car step for age between 18 and 25
    } else {
      setStep(3); // Otherwise, go directly to Drive Train step
    }
  };

  // Handle First Car Step Logic
  // Handle First Car Step Logic
const handleFirstCarNext = () => {
  if (userData.firstCar === 'yes') {
    setThankYouMessage("We are targeting more experienced clients, thank you for your interest");
    setShowIcon(false); // Optionally hide the icon
    setStep(7); // Go to Thank You step if 'Yes' is selected
  } else if (userData.firstCar === 'no') {
    setStep(4); // Go to Drive Train step if 'No' is selected
  }
};


  // Get content based on the step index
  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Age onNext={handleAgeNext} onBack={() => setStep(0)} />;
      case 1:
        return <CarLicense onNext={handleCarLicenseNext} />;
      case 2:
        return <FirstCar onNext={handleFirstCarNext} />;
      case 3:
        return <DriveTrain />;
      case 4:
        return <FuelEmissions />;
      case 5:
        return <FamilyCars />;
      case 6:
        return (
          <EachCar
            carIndex={0}
            onCarDetailsChange={() => {}}
          />
        );
      case 7:
        return <ThankYou message={thankYouMessage || 'Thank you for your participation!'} showIcon={showIcon} />;
      default:
        return <div>There is nothing here</div>;
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
