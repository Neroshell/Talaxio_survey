import React, { useState } from 'react';

export const multiStepContext = React.createContext<any>(null);

const ContextStep: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState<any[]>([]);
  const [finalData, setFinalData] = useState<any[]>([]);

  return (
    <multiStepContext.Provider value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData }}>
      {children} {/* Allow ContextStep to render its children */}
    </multiStepContext.Provider>
  );
};

export default ContextStep;
