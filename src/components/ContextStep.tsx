import React, { useState } from 'react';

export const multiStepContext = React.createContext<any>(null);

const ContextStep: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setStep] = useState(0);
  const [userData, setUserData] = useState<any>({});
  const [finalData, setFinalData] = useState<any[]>([]);
  
  // New state variables for counts
  const [adolescentCount, setAdolescentCount] = useState(0);
  const [unlicensedCount, setUnlicensedCount] = useState(0);
  const [FirstTimeOwnerCount, setFirstTimeOwnerCount] = useState(0);
  const [fuelEmissionConcernedCount, setFuelEmissionConcernedCount] = useState(0);

  
  function submitData() {
    console.log('submitData called');
  
    // This will only update finalData if the survey is fully completed
    // Check if on Thank You step
      setFinalData((prevData) => {
        const updatedData = [...prevData, userData];
  
        // Check for conditions after the full submission
        if (userData.age < 18) {
          setAdolescentCount((prevCount) => prevCount + 1);
        }
  
        if (userData.carLicense === 'no') {
          setUnlicensedCount((prevCount) => prevCount + 1);
        }
  
        if (userData.firstCar === 'yes') {
          setFirstTimeOwnerCount((prevCount) => prevCount + 1);
        }
  
        // Increment the concerned about fuel emissions count
        if (userData.fuelemissions === 'yes') {
          setFuelEmissionConcernedCount((prevCount) => prevCount + 1);
        }
  
        return updatedData; // Return the updated data
      });
    
  }
  

  return (
    <multiStepContext.Provider value={{ 
      currentStep, 
      submitData, 
      setStep, 
      userData, 
      setUserData, 
      finalData, 
      adolescentCount, // Provide count to context
      unlicensedCount, // Provide count to context
      FirstTimeOwnerCount,
      fuelEmissionConcernedCount ,
    
    }}>
      {children}
    </multiStepContext.Provider>
  );
}

export default ContextStep;
