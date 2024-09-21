import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import Dashboard from './components/Dashboard';
import { Button } from '@mui/material';

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
  const { currentStep, setStep, userData, submitData } = useContext(multiStepContext);
  
  const [thankYouMessage, setThankYouMessage] = useState<string | null>(null);
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState(false);

  const handleAgeNext = () => {
    const { age } = userData;
    if (age === '' || isNaN(age as number)) return;

    if (age < 18) {
      submitData();
      setThankYouMessage("Thank you for your interest");
      setShowIcon(false);
      setStep(7);
    } else {
      setStep(1);
    }
  };

  const handleCarLicenseNext = (licenseStatus: string) => {
    if (licenseStatus === 'no' && !submitted) {
      submitData();
      setSubmitted(true);
      setStep(7);
    } else if (userData.age !== null && userData.age >= 18 && userData.age <= 25) {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleFirstCarNext = (firstCar: string) => {
    if (firstCar === 'yes') {
      submitData();
      setThankYouMessage("We are targeting more experienced clients, thank you for your interest");
      setShowIcon(true);
      setStep(7);
    } else if (firstCar === 'no') {
      setStep(3);
    }
  };

  const handleFuelEmissionNext = (fuelEmissions: string) => {
    if (fuelEmissions === 'yes' && !submitted) {
      setSubmitted(true);
      setStep(6);
    } else {
      setStep(3);
    }
  };

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
        return <FuelEmissions onNext={handleFuelEmissionNext} />;
      case 5:
        return <FamilyCars />;
      case 6:
        return <EachCar carIndex={0} onCarDetailsChange={() => {}} />;
      case 7:
        return <ThankYou message={thankYouMessage || 'Thank you for your participation!'} showIcon={showIcon} />;
      default:
        return <div>There is nothing here</div>;
    }
  };

  return (
    <Router>
      <div className='main-box'>
        <Routes>
          <Route path="/" element={
            <>
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
              <Link to="/dashboard">
              <Button variant="contained" color="primary">
                   Go to Dashboard
                </Button>
              </Link>
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
