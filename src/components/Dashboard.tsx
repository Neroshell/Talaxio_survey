import React, { useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
} from '@mui/material';
import { multiStepContext } from './ContextStep';
import './components.css';
import BarChart from './BarChart';

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Car {
  carMake: string;
  carModel: string;
}

interface UserData {
  age: number;
  carLicense: string;
  firstCar: string;
  driveTrain?: string;
  familyCars?: number;
  fuelEmissions: string; 
  eachCar?: Car[];
  completedSurvey: boolean;
  fuelEmissionConcerned: string;
  
}

const DashBoard: React.FC = () => {
  const {
    finalData,
    adolescentCount,
    unlicensedCount,
    FirstTimeOwnerCount,
    targetableCount,
    averageFamilyCars,
    fuelEmissionConcernedCount,
    driveTrainCount,
 
  } = useContext(multiStepContext) as {
    finalData: UserData[];
    adolescentCount: number;
    unlicensedCount: number;
    FirstTimeOwnerCount: number;
    fuelEmissionConcernedCount: number;
    driveTrainCount: number;
    targetableCount: number;
    averageFamilyCars: number;
  
  
   
  };

  // Save data to local storage whenever finalData changes
  useEffect(() => {
    localStorage.setItem('finalData', JSON.stringify(finalData));
  }, [finalData]);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('finalData');
    if (storedData) {
      console.log('Loaded data from local storage:', JSON.parse(storedData));
    }
  }, []);

  // Calculate statistics
  const totalParticipants = finalData.length;
  const adolescentPercentage = totalParticipants > 0 ? (adolescentCount / totalParticipants) * 100 : 0;
  const unlicensedPercentage = totalParticipants > 0 ? (unlicensedCount / totalParticipants) * 100 : 0;
  const firstTimeOwnerPercentage = totalParticipants > 0 ? (FirstTimeOwnerCount / totalParticipants) * 100 : 0;
  const targetablePercentage = totalParticipants > 0 ? (targetableCount / totalParticipants) * 100 : 0;

  const fuelEmissionConcernedPercentage = totalParticipants > 0 
  ? (fuelEmissionConcernedCount / totalParticipants) * 100 
  : 0;

  const driveTrainPercentage = totalParticipants > 0
  ? (driveTrainCount / totalParticipants) * 100
  : 0; // Ensure it returns 0 instead of NaN
  
  
  const carMakeDistribution: { [key: string]: number } = {};
  const carModelDistribution: { [key: string]: number } = {};

  finalData.forEach(user => {
    if (user.eachCar && user.eachCar.length > 0) {
      user.eachCar.forEach(car => {
        carMakeDistribution[car.carMake] = (carMakeDistribution[car.carMake] || 0) + 1;
        const makeAndModel = `${car.carMake} ${car.carModel}`;
        carModelDistribution[makeAndModel] = (carModelDistribution[makeAndModel] || 0) + 1;
      });
    }
  });

  finalData.forEach((user, index) => {
    console.log(`User ${index}:`, user.fuelEmissionConcerned);
  });

  const chartData = {
    labels: ['Adolescents', 'Unlicensed', 'First-Car Owners', 'Targetables', 'TotalParticipants'],
    datasets: [
      {
        label: 'Number of Participants',
        data: [adolescentCount, unlicensedCount, FirstTimeOwnerCount, targetableCount, totalParticipants ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 4 }}>
        Staff Requirements Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Participants
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                {totalParticipants}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Adolescents
              </Typography>
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                {adolescentCount} ({adolescentPercentage.toFixed(2)}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Unlicensed Drivers
              </Typography>
              <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                {unlicensedCount} ({unlicensedPercentage.toFixed(2)}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                First-Car Owners
              </Typography>
              <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                {FirstTimeOwnerCount} ({firstTimeOwnerPercentage.toFixed(2)}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

       
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Concerned About Fuel Emissions
              </Typography>
              <Typography variant="h4" sx={{ color: '#673ab7', fontWeight: 'bold' }}>

              {fuelEmissionConcernedCount} ({fuelEmissionConcernedPercentage.toFixed(2)}%)
              
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Targetable Clients
              </Typography>
              <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
                {targetableCount} ({targetablePercentage.toFixed(2)}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Average Family Cars
              </Typography>
              <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                {averageFamilyCars.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Targetable FWD or "I don't know"
              </Typography>
              <Typography variant="h4" sx={{ color: '#8e24aa', fontWeight: 'bold' }}>
                   {driveTrainCount}   ({driveTrainPercentage.toFixed(2)}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Car Make Distribution */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Car Make Distribution
              </Typography>
              <List>
                {Object.entries(carMakeDistribution).map(([make, count]) => (
                  <ListItem key={make}>
                    {make}: {count}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Car Model Distribution */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '130px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Car Model Distribution
              </Typography>
              <List>
                {Object.entries(carModelDistribution).map(([makeModel, count]) => (
                  <ListItem key={makeModel}>
                    {makeModel}: {count}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{marginTop: '70px', }} item xs={12}>
          <Card  sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '32px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Participant Statistics
              </Typography>
              <BarChart data={chartData} /> {/* Render the chart */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
