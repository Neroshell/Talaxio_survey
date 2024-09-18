// App.tsx
import {  useContext } from 'react';
import { Stepper, Step, StepLabel} from '@mui/material';
import Age from './components/Age';
import Gender from './components/Gender';
import CarLicense from './components/CarLicense';
import FirstCar from './components/FirstCar';
import DriveTrain from './components/DriveTrain';
import FuelEmissions from './components/FuelEmissions';
import FamilyCars from './components/FamilyCars';
import ThankYou from './components/FinalThanks'; // Assuming this component exists
import './App.css';
import {multiStepContext} from './components/ContextStep';

const steps = [
  'Age',
  'Gender', 
  'Car License',
  'First Car',
  'Drive Train',
  'Fuel Emissions',
  'Family Cars',
  'Car Details',
];

function App() {

  const { currentStep } = useContext(multiStepContext);

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Age />;
      case 1:
        return <Gender />;
      case 2:
        return <CarLicense />;
      case 3:
        return <FirstCar />;
      case 4:
        return <DriveTrain />;
      case 5:
        return <FamilyCars />;
      case 6:
        return <FuelEmissions />;
      case 7:
        return <ThankYou message='I appreciate' />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className='main-box'>
      <Stepper style={{ width: '50%' }} activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div style={{ width: "50%", margin: '0 auto' }} className="step-content">
        {getStepContent(currentStep - 1)}
      </div>
    </div>
  );
}

export default App;
