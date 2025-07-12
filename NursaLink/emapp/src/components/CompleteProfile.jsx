import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/bg.jpg';

const CompleteProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const nurse = state?.nurse;

  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    if (!age || !address) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/nurse/update/${nurse._id}`, {
        age,
        address
      });

      navigate('/nursepage', { state: { nurse: { ...nurse, age, address } } });
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
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
        p: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976D2' }}
          >
            Complete Your Profile
          </Typography>

          <TextField
            label="Age"
            fullWidth
            type="number"
            margin="normal"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <TextField
            label="Address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              background: 'linear-gradient(135deg, #d81b60, #ffca28)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #c2185b, #f4b400)',
              },
            }}
            onClick={handleSubmit}
          >
            Save & Continue
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompleteProfile;
