import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { multiStepContext } from './ContextStep';

interface Car {
  carMake: string;
  carModel: string;
}

interface UserData {
  age: number;
  carLicense: string;
  firstCar: string;
  familyCars?: number;
  eachCar: Car[];
}


const Dashboard: React.FC = () => {
    const { finalData, adolescentCount, unlicensedCount, FirstTimeOwnerCount, fuelEmissionConcernedCount } = useContext(multiStepContext) as { 
      finalData: UserData[]; 
      adolescentCount: number; 
      unlicensedCount: number; 
      FirstTimeOwnerCount: number;
      fuelEmissionConcernedCount: number; // New count
    };
  
    // Calculate statistics
    const totalParticipants = finalData.length;
    const adolescentPercentage = totalParticipants > 0 ? (adolescentCount / totalParticipants) * 100 : 0;
    const unlicensedPercentage = totalParticipants > 0 ? (unlicensedCount / totalParticipants) * 100 : 0;
    const firstTimeOwnerPercentage = totalParticipants > 0 ? (FirstTimeOwnerCount / totalParticipants) * 100 : 0;
    const fuelEmissionConcernedPercentage = totalParticipants > 0 ? (fuelEmissionConcernedCount / totalParticipants) * 100 : 0;
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Staff Requirements Overview
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Participants</Typography>
                <Typography variant="h4">{totalParticipants}</Typography>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Adolescents</Typography>
                <Typography variant="h4">{adolescentCount} ({adolescentPercentage.toFixed(2)}%)</Typography>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Unlicensed Drivers</Typography>
                <Typography variant="h4">{unlicensedCount} ({unlicensedPercentage.toFixed(2)}%)</Typography>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">First-Time Owners</Typography>
                <Typography variant="h4">{FirstTimeOwnerCount} ({firstTimeOwnerPercentage.toFixed(2)}%)</Typography>
              </CardContent>
            </Card>
          </Grid>
  
          {/* New statistic card for fuel emissions concern */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Concerned About Fuel Emissions</Typography>
                <Typography variant="h4">{fuelEmissionConcernedCount} ({fuelEmissionConcernedPercentage.toFixed(2)}%)</Typography>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Add more statistic cards as needed */}
        </Grid>
      </Container>
    );
  };
  
  export default Dashboard;
  