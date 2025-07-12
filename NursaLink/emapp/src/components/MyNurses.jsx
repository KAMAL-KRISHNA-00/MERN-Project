import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/bg.jpg';

const MyNurses = () => {
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('customer');
    if (!stored) {
      alert("Login required");
      navigate('/login');
      return;
    }

    const customer = JSON.parse(stored);

    axios.get(`http://localhost:3000/customer/nurses/${customer._id}`)
      .then(res => {
        const formatted = res.data.map(nurse => ({
          ...nurse,
          age: nurse.age || 'Not Provided',
          address: nurse.address || 'Not Provided',
        }));
        setNurses(formatted);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load nurses");
      });
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        py: 8,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 800,
          width: '100%',
          p: 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, rgba(255,236,179,0.95), rgba(255,184,194,0.95))',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#d81b60',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          👩‍⚕️ My Nurses
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {nurses.length === 0 ? (
          <Typography sx={{ color: '#5d4037', textAlign: 'center' }}>
            No nurses have accepted your requests yet.
          </Typography>
        ) : (
          nurses.map((nurse, i) => (
            <Paper
              key={i}
              sx={{
                p: 3,
                my: 2,
                borderRadius: 3,
                background: '#fffaf0',
                border: '1px solid #ffe0b2',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <Typography><strong>Name:</strong> {nurse.name}</Typography>
              <Typography><strong>Email:</strong> {nurse.email}</Typography>
              <Typography><strong>Phone:</strong> {nurse.phone || 'Not Provided'}</Typography>
              <Typography><strong>Shift:</strong> {nurse.shift || 'N/A'}</Typography>
              <Typography><strong>Role:</strong> {nurse.role || 'Registered Nurse'}</Typography>
              <Typography><strong>Age:</strong> {nurse.age}</Typography>
              <Typography><strong>Address:</strong> {nurse.address}</Typography>
            </Paper>
          ))
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              background: 'linear-gradient(135deg, #d81b60, #ffca28)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '10px',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #c2185b, #ffb300)',
              },
            }}
          >
            ⬅ Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyNurses;
