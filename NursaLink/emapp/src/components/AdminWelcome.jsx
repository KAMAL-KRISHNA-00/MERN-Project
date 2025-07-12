import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import bgImage from '../assets/bg.jpg'; 

const AdminWelcome = () => {
  const handleLogout = () => {
    alert('Logging out...');
    localStorage.removeItem('admin');
    window.location.href = '/';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 5,
          borderRadius: 5,
          background: 'linear-gradient(135deg, rgba(255,236,179,0.9), rgba(255,184,194,0.95))',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: '#d81b60',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          Welcome, Admin!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#444',
            fontSize: '18px',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          You're now logged in. You can manage nurses and review user feedback below.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
         
          <Link to="/adminnursecards" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #d81b60, #ffca28)',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 1.3,
                borderRadius: 2,
                boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #c2185b, #ffb300)',
                },
              }}
            >
              View Nurse List
            </Button>
          </Link>

        
          <Link to="/adminfeedback" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #ff8a65, #ffd54f)',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 1.3,
                borderRadius: 2,
                boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff7043, #ffca28)',
                },
              }}
            >
              View Feedbacks
            </Button>
          </Link>
        </Box>

       
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{
            mt: 4,
            fontWeight: 'bold',
            px: 3,
            borderRadius: 2,
            borderColor: '#e53935',
            '&:hover': {
              backgroundColor: '#ffebee',
              borderColor: '#c62828',
            }
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminWelcome;
