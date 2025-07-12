import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider
} from '@mui/material';
import axios from 'axios';
import bg from '../assets/bg.jpg';

const AssignedCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nurse = location.state?.nurse || JSON.parse(localStorage.getItem('nurse')) || null;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!nurse || !nurse._id) {
      alert("Access denied. Please login again.");
      navigate('/login');
      return;
    }
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/nurse/appointments/${nurse._id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      alert("Could not load appointments.");
    }
  };

  const goBack = () => navigate('/nursepage', { state: { nurse } });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          maxWidth: 800,
          width: '100%',
          borderRadius: 5,
          background: 'linear-gradient(to bottom right, #ffeef0, #fffde7)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#c2185b',
            fontWeight: 'bold',
            mb: 3,
            textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
          }}
        >
          📋 Assigned Customers
        </Typography>
        <Divider sx={{ my: 2 }} />

        {appointments.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ color: '#616161' }}>
            No customers have booked you yet.
          </Typography>
        ) : (
          appointments.map((cust, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 2,
                my: 2,
                border: '1px solid #f8bbd0',
                borderRadius: 3,
                background: '#fff8e1',
              }}
            >
              <Typography><strong>Name:</strong> {cust.name}</Typography>
              <Typography><strong>Email:</strong> {cust.email}</Typography>
              <Typography><strong>Phone:</strong> {cust.phone}</Typography>
            </Paper>
          ))
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={goBack}
            sx={{
              background: 'linear-gradient(135deg, #f8bbd0, #ffe082)',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '10px',
              '&:hover': {
                background: 'linear-gradient(135deg, #f48fb1, #ffd54f)',
              },
              px: 3,
              py: 1,
            }}
          >
            ⬅ Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignedCustomer;
