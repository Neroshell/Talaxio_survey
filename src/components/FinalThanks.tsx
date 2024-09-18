import React from 'react';
import { Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Icon import
import './components.css'; // Your custom styles

interface ThankYouProps {
  message: string;
  showIcon?: boolean; // Optional prop for showing the icon
}

const ThankYou: React.FC<ThankYouProps> = ({ message, showIcon = true }) => {
  return (
    <div className="form-container">
      {showIcon && (
        <Box textAlign="center" mb={4}>
          {/* Icon */}
          <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 60 }} />
        </Box>
      )}

      {/* Thank you heading */}
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Thank You!
      </Typography>

      {/* Success message */}
      <Typography variant="body1" align="center">
        {message}
      </Typography>
    </div>
  );
};

export default ThankYou;
