import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  Container,
  CardMedia,
  Rating,
  CssBaseline
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import bgImage from '../assets/bg.jpg'; 
import { useNavigate } from 'react-router-dom';

const AdminNursecards = () => {
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate();

  const fetchNurses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/nurse/view');

      const trustWords = [
        "You can count on me.",
        "Always here to help.",
        "Your care is my duty.",
        "Trusted hands, calm heart.",
        "Support when you need it.",
        "With you every step.",
        "Caring with commitment.",
        "I value your trust.",
        "You’re in good hands.",
        "Dedicated to your well-being."
      ];

      const updatedNurses = res.data.map((nurse, index) => ({
        ...nurse,
        image: `/download${(index % 10) + 1}.jpg`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        wordsOfTrust: trustWords[index % trustWords.length],
        age: nurse.age || 'Not Provided',
        address: nurse.address || 'Not Provided'
      }));

      setNurses(updatedNurses);
    } catch (err) {
      console.error('Error fetching nurse data:', err);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this nurse?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/nurse/delete/${id}`);
      alert('Nurse deleted successfully');
      fetchNurses();
    } catch (err) {
      console.error('Error deleting nurse:', err);
      alert('Failed to delete nurse');
    }
  };

  const handleUpdate = (nurse) => {
    navigate(`/update-nurse/${nurse._id}`, { state: { nurse } });
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '50px 0',
          backdropFilter: 'blur(3px)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#d81b60',
              mb: 6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            👩‍⚕️ Our Trusted Nurses (Admin View)
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {nurses.map((nurse) => (
              <Grid item xs={12} sm={6} md={6} key={nurse._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 4,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    background: 'linear-gradient(to top, #fff9f9, #fffaf0)',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={nurse.image}
                    alt={`Nurse ${nurse.name}`}
                  />

                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {nurse.name?.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {nurse.name}
                      </Typography>
                    }
                    subheader={`Age: ${nurse.age}`}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      🏠 <strong>Address:</strong> {nurse.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      ☎️ <strong>Contact:</strong> {nurse.phone || 'Not Provided'}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      ⭐ <strong>Rating:</strong>
                      <Rating
                        value={parseFloat(nurse.rating)}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{ ml: 1 }}
                      />
                      ({nurse.rating})
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, fontStyle: 'italic', color: '#444' }}
                    >
                      “{nurse.wordsOfTrust}”
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-around' }}>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(nurse._id)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 'bold',
                        borderColor: '#f44336',
                        '&:hover': {
                          backgroundColor: '#ffebee',
                          borderColor: '#c62828',
                        },
                      }}
                    >
                      ❌ Delete
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleUpdate(nurse)}
                      sx={{
                        background: 'linear-gradient(135deg, #ff9800, #ffc107)',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: 'bold',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #f57c00, #ffb300)',
                        },
                      }}
                    >
                      ✏️ Update
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default AdminNursecards;
