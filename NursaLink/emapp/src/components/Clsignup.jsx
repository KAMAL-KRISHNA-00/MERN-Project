import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/0b6b4550-5855-4bce-81dd-4ea32f592192.jpg';

const Clsignup = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = () => {
    const { role } = input;
    let endpoint = '';

    if (role === 'nurse') {
      endpoint = 'http://localhost:3000/nurse/add';
    } else if (role === 'customer') {
      endpoint = 'http://localhost:3000/customer/add';
    } else {
      alert('Unknown role selected.');
      return;
    }

    axios
      .post(endpoint, input)
      .then((res) => {
        alert('Signup successful!');
        navigate('/login');
      })
      .catch((err) => {
        alert('Signup failed');
        console.error(err);
      });
  };

  const buttonStyle = {
  py: 1.5,
  fontWeight: 700,
  fontSize: '1.05rem',
  background: 'linear-gradient(135deg, rgb(255, 184, 194), rgb(255, 236, 179))',
  color: '#000',
  borderRadius: '10px',
  border: '1px solid #fce4ec',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 10px rgba(255, 192, 203, 0.4)', 

  '&:hover': {
    background: 'linear-gradient(135deg, #f8bbd0, #ffe082)',
    boxShadow: '0 6px 14px rgba(255, 182, 193, 0.5)', 
  },
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: '0 3px 8px rgba(255, 182, 193, 0.4)', 
  },
};


  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            mb: 4,
            textShadow: '1px 1px 1pxrgb(0, 0, 0)',
            fontFamily: 'sans-serif'
          }}
        >
          SIGN UP
        </Typography>

        <TextField
          variant="outlined"
          label="Name"
          name="name"
          fullWidth
          value={input.name}
          onChange={inputHandler}
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={input.email}
          onChange={inputHandler}
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={input.password}
          onChange={inputHandler}
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          label="Phone"
          name="phone"
          fullWidth
          value={input.phone}
          onChange={inputHandler}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>User Role</InputLabel>
          <Select
            name="role"
            value={input.role}
            label="User Role"
            onChange={inputHandler}
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="nurse">Nurse</MenuItem>
          </Select>
        </FormControl>

        <Button fullWidth sx={buttonStyle} onClick={signupHandler}>
          SIGN UP
        </Button>

        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button fullWidth sx={{ ...buttonStyle, mt: 2 }}>
            GO BACK
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default Clsignup;
