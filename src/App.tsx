import  { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Stepper, Step, StepLabel, Box, Button, Grid } from '@mui/material';
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
import DashBoard from './components/DashBoard.tsx';

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
  const { currentStep, setStep, userData, submitData, submitFuelEmissionNext, submitDrivetrainNext  } = useContext(multiStepContext);
  
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
    // Update the form data with the user's fuel emission response
  
    // Check if the user is concerned about fuel emissions
    if (fuelEmissions === 'yes') {
      // Call the function to handle fuel emission concerns
      submitFuelEmissionNext(fuelEmissions);
    }
  
    // Move to the next step (assumed to be FamilyCars)
    setStep(5); 
  };
  
  const handleDrivetrainNext = (driveTrain: string) => {
 
    // Check if the user selected "FWD" or "I don't know" for the drivetrain
    if (driveTrain === 'FWD' || driveTrain === "I don't know") {
        // Call the function to handle the drivetrain response count
        submitDrivetrainNext(driveTrain);
      
    }

    // Move to the next step (assumed to be FuelEmissions)
    setStep(6); 
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
        return <DriveTrain onNext={handleDrivetrainNext} />;
      case 4:
        return <FuelEmissions onNext={handleFuelEmissionNext} />;
      case 5:
        return <FamilyCars />;
      case 6:
        return <EachCar carIndex={0}  />;
      case 7:
        return <ThankYou message={thankYouMessage || 'Thank you for your participation!'} showIcon={showIcon} />;
      default:
        return <div>There is nothing here</div>;
    }
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={
            <Box className='main-box'>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                  <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={label} active={index === currentStep}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
              <Grid container  justifyContent="center">
                <Grid item xs={12} sm={10} md={8} className="step-content">
                  {getStepContent(currentStep)}
                </Grid>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Go to Dashboard
                  </Button>
                </Link>
              </Grid>
            </Box>
          } />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      
    </Router>
  );
}

export default App;
