import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, Container } from '@mui/material';
import axios from 'axios';
import bgImage from '../assets/bg.jpg'; 

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/feedback/view')
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("❌ Error loading feedbacks:", err));
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        py: 8,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #fff3e0, #ffe0e0)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
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
            💌 Feedback Received
          </Typography>

          {feedbacks.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ mt: 4 }}>
              No feedback received yet.
            </Typography>
          ) : (
            <Box
              sx={{
                mt: 4,
                maxHeight: '60vh',
                overflowY: 'auto',
                pr: 1,
              }}
            >
              {feedbacks.map((fb, index) => (
                <Paper
                  key={fb._id || `${fb.email}_${index}`}
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderLeft: '6px solid #ffb74d',
                    backgroundColor: '#fffefc',
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: '#1976d2' }}
                  >
                    {fb.name} &nbsp; <span style={{ fontSize: '0.9rem', color: '#444' }}>({fb.email})</span>
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
                    {fb.message}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'gray',
                      display: 'block',
                      mt: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    {fb.date
                      ? new Date(fb.date).toLocaleString()
                      : 'Date not available'}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminFeedback;
