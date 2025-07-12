import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container
} from '@mui/material';
import bgImage from '../assets/bg.jpg'; 

const ContactUs = () => {
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
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 5,
            background: 'linear-gradient(135deg, rgba(255, 236, 179, 0.95), rgba(255, 184, 194, 0.95))',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(5px)',
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
            📞 Contact Us
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, textAlign: 'center', color: '#4e342e' }}
          >
            We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.
          </Typography>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              type="tel"
              fullWidth
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              required
            />

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
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;
