import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/bg.jpg'; 

const UpdateNurse = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const nurse = state?.nurse;

  const [name, setName] = useState(nurse?.name || '');
  const [email, setEmail] = useState(nurse?.email || '');
  const [phone, setPhone] = useState(nurse?.phone || '');
  const [address, setAddress] = useState(nurse?.address || '');
  const [age, setAge] = useState(nurse?.age || '');
  const [role, setRole] = useState(nurse?.role || '');
  const [shift, setShift] = useState(nurse?.shift || '');

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/nurse/update/${id}`, {
        name,
        email,
        phone,
        address,
        age,
        role,
        shift,
      });

      alert('✅ Nurse updated successfully!');
      navigate('/adminnursecards'); 
    } catch (err) {
      console.error('Error updating nurse:', err);
      alert('❌ Failed to update nurse.');
    }
  };

  if (!nurse) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h6" color="error">
          Nurse data not found. Please go back.
        </Typography>
      </Container>
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
        backdropFilter: 'blur(4px)',
      }}
    >
      <Paper elevation={10} sx={{ p: 5, width: '100%', maxWidth: 600, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold" align="center">
          ✏️ Update Nurse Info
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          fullWidth
          label="Age"
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          fullWidth
          label="Address"
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          fullWidth
          label="Role"
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <TextField
          fullWidth
          label="Shift"
          margin="normal"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ⬅ Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            ✅ Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateNurse;