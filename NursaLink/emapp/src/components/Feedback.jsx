import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Rating,
  Container,
  Alert,
} from '@mui/material';
import axios from 'axios';
import bgImage from '../assets/bg.jpg';

const Feedback = () => {
  const [rating, setRating] = useState(4);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('customer');
    if (stored) {
      const user = JSON.parse(stored);
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus({ type: 'error', msg: 'Please fill in all required fields.' });
      return;
    }

    try {
      await axios.post('http://localhost:3000/feedback/add', {
        name,
        email,
        message,
        rating,
      });
      setStatus({ type: 'success', msg: 'Thanks for your feedback! 🚀' });
      setMessage('');
      setRating(4);
    } catch (err) {
      console.error('❌ Feedback submission failed:', err);
      setStatus({ type: 'error', msg: 'Something went wrong. Try again later.' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 5,
            background: 'linear-gradient(135deg, rgba(255, 236, 179, 0.9), rgba(255, 184, 194, 0.9))',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: '#d81b60',
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            💬 Feedback
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, textAlign: 'center', color: '#4e342e' }}
          >
            Tell us how we're doing! Your thoughts help us serve you better.
          </Typography>

          {status && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.msg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Your Feedback"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: '#5d4037' }}>Rating:</Typography>
              <Rating
                name="feedback-rating"
                value={rating}
                onChange={(e, newVal) => setRating(newVal)}
                precision={1}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
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
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Feedback;
