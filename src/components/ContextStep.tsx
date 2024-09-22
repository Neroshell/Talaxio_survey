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
  const [targetableCount, setTargetableCount] = useState(initialCounts.targetableCount || 0);
  const [fuelEmissionConcernedCount, setFuelEmissionConcernedCount] = useState<number>(initialCounts.fuelEmissionConcernedCount || 0);
  const [driveTrainCount, setDrivetrainCount] = useState<number>(initialCounts.driveTrainCount || 0);


  
  const totalSteps = 7;

  // Average calculation based on total cars and number of users
  const averageFamilyCars = finalData.length > 0
    ? finalData.reduce((total, data) => total + (data.familyCars || 0), 0) / finalData.reduce((count, data) => count + (data.familyCars ? 1 : 0), 0)
    : 0;

  // Percentage calculation for fuel emission concerned users
 

  // Save finalData and counts to local storage whenever they change
  useEffect(() => {

    
    localStorage.setItem('finalData', JSON.stringify(finalData));
    localStorage.setItem('counts', JSON.stringify({
      adolescentCount,
      unlicensedCount,
      FirstTimeOwnerCount,
      fuelEmissionConcernedCount,
      targetableCount,
      driveTrainCount
    
    }));
  }, [finalData, adolescentCount, unlicensedCount, FirstTimeOwnerCount, fuelEmissionConcernedCount, driveTrainCount, targetableCount]);

  useEffect(() => {
    console.log('Updated fuelEmissionConcernedCount:', fuelEmissionConcernedCount, driveTrainCount);
  }, [fuelEmissionConcernedCount, driveTrainCount]);

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
      
      if (userData.fuelEmissions === 'yes' && !userData.fuelEmissionCounted) {
        console.log('Update fuel emission count at final step');
        setFuelEmissionConcernedCount((prevCount: number) => prevCount + 1);
        setUserData((prevData: any) => ({ ...prevData, fuelEmissionCounted: true }));
        console.log('fuelemission Counted:', userData.fuelEmissionCounted); 
      }
    
      if ((userData.drivetrain === 'fwd' || userData.drivetrain === "I don't know") && !userData.drivetrainCounted) {
        console.log('Update drivetrain count at final step');
        setDrivetrainCount((prevCount: number) => prevCount + 1);
        setUserData((prevData: any) => ({ ...prevData, drivetrainCounted: true }));
        console.log('User Data:', userData); // Check the entire userData object
        console.log('Drivetrain Value:', userData.drivetrain); // Check the specific value
        console.log('Drivetrain Counted:', userData.drivetrainCounted); 
      }
  
      if (currentStep === totalSteps - 1) {  // If user is at the last step
        setUserData((prevData: any) => ({ ...prevData, completedSurvey: true }));
        setTargetableCount((prevCount: number) => prevCount + 1);
      }
      console.log('User Data in submitData:', userData);

      return updatedData; // Return the updated data
    });
  }



  function submitFuelEmissionNext(fuelEmissions: string) {
    console.log('submitFuelEmissionNext called');
  
    // Just update the user data with the selected fuel emissions response
    setUserData((prevData: any) => ({
      ...prevData,
      fuelEmissions,  // Store the user's choice here
    }));
  
    console.log('Fuel emissions response recorded:', fuelEmissions);
  }
  
  function submitDrivetrainNext(driveTrain: string) {
    console.log('Drive train called');
    // Update userData with drivetrain selection
    setUserData((prevData: any) => {
      const isFWDOrUnknown = (driveTrain === 'FWD' || driveTrain === "I don't know");
      
      return {
        ...prevData,
        driveTrain,
        drivetrainCounted: isFWDOrUnknown ? true : prevData.drivetrainCounted,
      };
    });
  
    // If user selected FWD or "I don't know", update the count
    if ((driveTrain === 'FWD' || driveTrain === "I don't know") && !userData.drivetrainCounted) {
      setDrivetrainCount((prevCount) => prevCount + 1);
    }
  }
  
  return (
    <multiStepContext.Provider value={{ 
      currentStep, 
      submitData, 
      submitFuelEmissionNext,
      submitDrivetrainNext,
      setStep, 
      userData, 
      setUserData, 
      finalData, 
      adolescentCount, 
      unlicensedCount, 
      FirstTimeOwnerCount, 
      averageFamilyCars, // Provide average to context
      targetableCount,
      fuelEmissionConcernedCount, 
      driveTrainCount
     
     
       // Expose this variable
   // Provide percentage to context
    }}>
      {children}
    </multiStepContext.Provider>
  );
}

export default ContextStep;
