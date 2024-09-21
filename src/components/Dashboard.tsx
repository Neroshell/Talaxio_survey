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
import './components.css'

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
  eachCar?: Car[];
  completedSurvey: boolean; 
  fuelEmissionConcerned: boolean;
}

const Dashboard: React.FC = () => {
  const { finalData, adolescentCount, unlicensedCount, FirstTimeOwnerCount, fuelEmissionConcernedCount, targetableCount, averageFamilyCars } = useContext(multiStepContext) as { 
    finalData: UserData[]; 
    adolescentCount: number; 
    unlicensedCount: number; 
    FirstTimeOwnerCount: number; 
    fuelEmissionConcernedCount: number; 
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
      // You may want to dispatch this to your context or handle it as needed
      console.log('Loaded data from local storage:', JSON.parse(storedData));
    }
  }, []);

  // Calculate statistics
  const totalParticipants = finalData.length;
  const adolescentPercentage = totalParticipants > 0 ? (adolescentCount / totalParticipants) * 100 : 0;
  const unlicensedPercentage = totalParticipants > 0 ? (unlicensedCount / totalParticipants) * 100 : 0;
  const firstTimeOwnerPercentage = totalParticipants > 0 ? (FirstTimeOwnerCount / totalParticipants) * 100 : 0;
  const fuelEmissionConcernedPercentage = totalParticipants > 0 ? (fuelEmissionConcernedCount / totalParticipants) * 100 : 0;
  const targetablePercentage = totalParticipants > 0 ? (targetableCount / totalParticipants) * 100 : 0;

  const targetableUsers = finalData.filter(user => user.age >= 18 && user.completedSurvey); 
  const targetableFWDorDontKnow = targetableUsers.filter(user => user.driveTrain === 'FWD' || user.driveTrain === "I don't know");
  const fwdOrDontKnowPercentage = targetableUsers.length > 0 ? (targetableFWDorDontKnow.length / targetableUsers.length) * 100 : 0;

  const carMakeDistribution: { [key: string]: number } = {};
  const carModelDistribution: { [key: string]: number } = {};

  finalData.forEach(user => {
    if (user.eachCar && user.eachCar.length > 0) {
      user.eachCar.forEach(car => {
        if (carMakeDistribution[car.carMake]) {
          carMakeDistribution[car.carMake]++;
        } else {
          carMakeDistribution[car.carMake] = 1;
        }
        const makeAndModel = `${car.carMake} ${car.carModel}`;
        if (carModelDistribution[makeAndModel]) {
          carModelDistribution[makeAndModel]++;
        } else {
          carModelDistribution[makeAndModel] = 1;
        }
      });
    }
  });

  return (
    <div className='dashboard-container'>
      <Typography variant="h4" sx={{textAlign: 'center'}} gutterBottom>
        Staff Requirements Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Existing statistics cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent >
              <Typography variant="h6">Total Participants</Typography>
              <Typography variant="h4">{totalParticipants}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">Adolescents</Typography>
              <Typography variant="h4">{adolescentCount} ({adolescentPercentage.toFixed(2)}%)</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">Unlicensed Drivers</Typography>
              <Typography variant="h4">{unlicensedCount} ({unlicensedPercentage.toFixed(2)}%)</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">First-Time Owners</Typography>
              <Typography variant="h4">{FirstTimeOwnerCount} ({firstTimeOwnerPercentage.toFixed(2)}%)</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">Concerned About Fuel Emissions</Typography>
              <Typography variant="h4"> {fuelEmissionConcernedCount} ({fuelEmissionConcernedPercentage.toFixed(2)}%)</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">Targetable Clients</Typography>
              <Typography variant="h4">{targetableCount} ({targetablePercentage.toFixed(2)}%)</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">Average Family Cars</Typography>
              <Typography variant="h4">{averageFamilyCars.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card  sx={{height: '130px'}}>
            <CardContent>
              <Typography variant="h6">Targetable FWD or "I don't know"</Typography>
              <Typography variant="h4">{fwdOrDontKnowPercentage.toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
    <Card  sx={{ height: 'auto' }}>
      <CardContent>
        <Typography variant="h6">Car Make Distribution</Typography>
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

  <Grid item xs={12} sm={6} md={3}>
    <Card  sx={{ height: 'auto' }}>
      <CardContent>
        <Typography variant="h6">Car Model Distribution</Typography>
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
      </Grid>
    </div>
  );
};

export default Dashboard;
