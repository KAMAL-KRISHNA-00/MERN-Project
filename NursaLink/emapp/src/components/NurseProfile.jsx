import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button
} from '@mui/material';
import bgImage from '../assets/bg.jpg'; 

const NurseProfile = () => {
  const { state } = useLocation();
  const nurse = state?.nurse;
  const navigate = useNavigate();

  if (!nurse) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          textAlign: 'center',
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
          }}
        >
          <Typography variant="h6" color="error">
            ❌ No profile data found.
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          maxWidth: 600,
          width: '100%',
          borderRadius: 5,
          background: 'linear-gradient(135deg, rgba(255,236,179,0.95), rgba(255,184,194,0.95))',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#d81b60',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {nurse.name || 'Nurse Profile'}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Age:</strong> {nurse.age || 'Not Provided'}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Phone:</strong> {nurse.phone || 'Not Provided'}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Address:</strong>{' '}
          {typeof nurse.address === 'string'
            ? nurse.address
            : `${nurse.address?.street || ''}, ${nurse.address?.city || ''}, ${nurse.address?.pincode || ''}`
          }
        </Typography>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              background: 'linear-gradient(135deg, #d81b60, #ffca28)',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1,
              borderRadius: '10px',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #c2185b, #ffb300)',
              }
            }}
          >
            ⬅ Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NurseProfile;
