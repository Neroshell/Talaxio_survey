import React, { useState, useEffect } from 'react';

export const multiStepContext = React.createContext<any>(null);

const ContextStep: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setStep] = useState(0);
  const [userData, setUserData] = useState<any>({});
  const [finalData, setFinalData] = useState<any[]>(() => {
    const storedData = localStorage.getItem('finalData');
    return storedData ? JSON.parse(storedData) : [];
  });

  // Load counts from local storage
  const initialCounts = JSON.parse(localStorage.getItem('counts') || '{}');
  const [adolescentCount, setAdolescentCount] = useState(initialCounts.adolescentCount || 0);
  const [unlicensedCount, setUnlicensedCount] = useState(initialCounts.unlicensedCount || 0);
  const [FirstTimeOwnerCount, setFirstTimeOwnerCount] = useState(initialCounts.FirstTimeOwnerCount || 0);
  const [fuelEmissionConcernedCount, setFuelEmissionConcernedCount] = useState(initialCounts.fuelEmissionConcernedCount || 0);
  const [targetableCount, setTargetableCount] = useState(initialCounts.targetableCount || 0);

  const totalSteps = 7;

  // Average calculation based on total cars and number of users
  const averageFamilyCars = finalData.length > 0
    ? finalData.reduce((total, data) => total + (data.familyCars || 0), 0) / finalData.reduce((count, data) => count + (data.familyCars ? 1 : 0), 0)
    : 0;

  // Save finalData and counts to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('finalData', JSON.stringify(finalData));
    localStorage.setItem('counts', JSON.stringify({
      adolescentCount,
      unlicensedCount,
      FirstTimeOwnerCount,
      fuelEmissionConcernedCount,
      targetableCount,
    }));
  }, [finalData, adolescentCount, unlicensedCount, FirstTimeOwnerCount, fuelEmissionConcernedCount, targetableCount]);

  function submitData() {
    console.log('submitData called');
  
    setFinalData((prevData) => {
      const updatedData = [...prevData, userData];
  
      // Check for conditions after the full submission
      if (userData.age < 18) {
        setAdolescentCount((prevCount: number) => prevCount + 1);
      }
  
      if (userData.carLicense === 'no') {
        setUnlicensedCount((prevCount: number) => prevCount + 1);
      }
  
      if (userData.firstCar === 'yes') {
        setFirstTimeOwnerCount((prevCount: number) => prevCount + 1);
      }
  
      if (userData.fuelEmissionConcerned === 'yes') {
        setFuelEmissionConcernedCount((prevCount: number) => prevCount + 1);
      }
  
      if (currentStep === totalSteps - 1) {  // If user is at the last step
        setUserData(() => ({ ...prevData, completedSurvey: true }));
        setTargetableCount((prevCount: number) => prevCount + 1);
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
      adolescentCount, 
      unlicensedCount, 
      FirstTimeOwnerCount, 
      fuelEmissionConcernedCount, 
      averageFamilyCars, // Provide average to context
      targetableCount
    }}>
      {children}
    </multiStepContext.Provider>
  );
}

export default ContextStep;
