import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/0b6b4550-5855-4bce-81dd-4ea32f592192.jpg'; 


const CustomerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer || JSON.parse(localStorage.getItem('customer'));

  useEffect(() => {
    if (!customer) {
      alert("Access denied. Please log in first.");
      navigate('/login');
    }
  }, [customer, navigate]);

  if (!customer) return null;

  const handleLogout = () => {
    localStorage.removeItem('customer');
    navigate('/');
  };

  const handleMyNurses = () => {
    navigate('/mynurses', { state: { customer } });
  };

  const buttonStyle = {
    py: 1.2,
    px: 3,
    fontWeight: 700,
    fontSize: '1rem',
    background: 'linear-gradient(135deg, rgb(255, 200, 221), rgb(255, 245, 204))',
    color: '#4e3f3f',
    borderRadius: '10px',
    border: '1px solid #ffe4ec',
    boxShadow: '0 4px 12px rgba(255, 182, 193, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #f8bbd0, #fff59d)',
      boxShadow: '0 6px 16px rgba(255, 182, 193, 0.5)',
    },
    '&:active': {
      transform: 'scale(0.97)',
      boxShadow: '0 3px 10px rgba(255, 182, 193, 0.3)',
    },
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 6,
        paddingX: 4,
        animation: 'fadein 1.2s ease-in-out',
        '@keyframes fadein': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#ad1457',
          textDecoration: 'underline',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 3,
        }}
      >
        Welcome to NursaLink, {customer.name}!
      </Typography>

      <Paper
        elevation={10}
        sx={{
          mt: 2,
          padding: 3,
          maxWidth: 550,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 240, 245, 0.6)',
          borderRadius: '15px',
          color: '#4e3f3f',
          border: '1px solid rgba(255,182,193,0.5)',
          textAlign: 'left',
          boxShadow: '0 4px 20px rgba(255,192,203,0.3)',
        }}
      >
        <Typography variant="h5" gutterBottom><u>Your Info</u></Typography>
        <Typography><strong>Name:</strong> {customer.name}</Typography>
        <Typography><strong>Email:</strong> {customer.email}</Typography>
        <Typography><strong>Phone:</strong> {customer.phone}</Typography>
        <Typography><strong>Role:</strong> {customer.role}</Typography>
      </Paper>

      <Typography
        sx={{
          color: '#3e2723',
          mt: 3,
          textAlign: 'center',
          maxWidth: 800,
          fontSize: '1.1rem',
          backgroundColor: 'rgba(255, 253, 231, 0.7)',
          padding: 2,
          borderRadius: 3,
          fontWeight: 500,
          boxShadow: '0 2px 6px rgba(255, 204, 128, 0.3)',
        }}
      >
        Your trusted home care partner. <br />
        Providing compassionate, reliable nursing services tailored to your needs. <br />
        Access personalized support and manage your bookings, all in one place.
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        <Link to="/nursecards" style={{ textDecoration: 'none' }}>
          <Button sx={buttonStyle}>Book a Nurse</Button>
        </Link>
        <Button sx={buttonStyle} onClick={handleMyNurses}>My Nurses</Button>
        <Button sx={{ ...buttonStyle, background: '#ffcccb' }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Paper
        elevation={10}
        sx={{
          mt: 6,
          mb: 4,
          padding: 3,
          maxWidth: 550,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 240, 245, 0.6)',
          borderRadius: '15px',
          color: '#4e3f3f',
          border: '1px solid rgba(255,182,193,0.4)',
          textAlign: 'left',
          boxShadow: '0 4px 20px rgba(255,192,203,0.3)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thank you for choosing NursaLink —
        </Typography>

        <Typography sx={{ fontStyle: 'italic', mb: 2 }}>
          _ where care meets comfort and professionalism...
        </Typography>

        <Typography>
          <strong>Helpdesk:</strong> +91 98765 43210 <br />
          <strong>Office:</strong> +91 484 265 1100 <br />
          <strong>Email:</strong> support@nursalink.in
        </Typography>
      </Paper>
    </Box>
  );
};

export default CustomerDashboard;
