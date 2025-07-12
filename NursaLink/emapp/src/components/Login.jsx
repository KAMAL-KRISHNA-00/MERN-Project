import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/0b6b4550-5855-4bce-81dd-4ea32f592192.jpg';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    const { email, password } = input;

    if (email === 'admin@nursalink.com' && password === 'admin123') {
      alert('Welcome Admin!');
      localStorage.clear();
      navigate('/AdminWelcome');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/login', input);
      const { role, message, user } = res.data;

      alert(message);

      if (role === 'customer') {
        localStorage.clear();
        localStorage.setItem('customer', JSON.stringify(user));
        navigate('/customerdashboard', { state: { customer: user } });
      } else if (role === 'nurse') {
        localStorage.clear();
        localStorage.setItem('nurse', JSON.stringify(user));

        if (!user.age || !user.address) {
          navigate('/complete-profile', { state: { nurse: user } });
        } else {
          navigate('/nursepage', { state: { nurse: user } });
        }
      } else {
        alert('Unknown role. Please contact admin.');
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
      console.error("Login error:", err);
    }
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
          }}
        >
          LOG IN
        </Typography>

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          fullWidth
          value={input.email}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          value={input.password}
          onChange={handleChange}
          sx={{ mb: 4 }}
        />

        <Button fullWidth sx={buttonStyle} onClick={loginHandler}>
          LOG IN
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            mb: 1,
            color: '#000',
            fontWeight: 500,
            fontSize: '1rem',
          }}
        >
          Don’t have an account?
        </Typography>

        <Link to="/clsignup" style={{ textDecoration: 'none' }}>
          <Button fullWidth sx={buttonStyle}>
            SIGN UP
          </Button>
        </Link>

        <Link to="/home" style={{ textDecoration: 'none' }}>
          <Button fullWidth sx={{ ...buttonStyle, mt: 2 }}>
            GO BACK
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default Login;
