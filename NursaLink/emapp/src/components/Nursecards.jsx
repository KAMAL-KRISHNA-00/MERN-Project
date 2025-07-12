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
import { useNavigate } from 'react-router-dom';

const NurseCards = () => {
  const [nurses, setNurses] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [requestedNurses, setRequestedNurses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      try {
        const parsed = JSON.parse(storedCustomer);
        if (parsed && parsed._id) setCustomer(parsed);
      } catch (err) {
        console.error("Error parsing customer from localStorage", err);
      }
    }

    axios.get('http://localhost:3000/nurse/view')
      .then((res) => {
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
          id: nurse._id || index,
          _id: nurse._id,
          name: nurse.name || 'Nurse',
          age: nurse.age || 'Not Provided',
          address: nurse.address || 'Not Provided',
          phone: nurse.phone || 'Not Provided',
          rating: (Math.random() * 2 + 3).toFixed(1),
          wordsOfTrust: trustWords[index % trustWords.length],
          image: nurse.image || 'https://www.w3schools.com/howto/img_avatar.png'
        }));

        setNurses(updatedNurses);
      })
      .catch((err) => {
        console.error('Error fetching nurse data:', err);
      });
  }, []);

  const requestNurse = async (nurseId) => {
    if (!customer || !customer._id) return alert("Please login as customer first.");

    if (requestedNurses.includes(nurseId)) return alert("You already requested this nurse.");

    try {
      const res = await axios.post(`http://localhost:3000/nurse/request/${nurseId}`, {
        customerId: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      });

      setRequestedNurses(prev => [...prev, nurseId]);
      alert(res.data?.message || "Request sent!");
    } catch (err) {
      console.error("Request failed:", err);
      alert(err.response?.data?.message || "Request failed.");
    }
  };

  const handleViewProfile = (nurse) => {
    navigate(`/nurse-profile/${nurse._id}`, { state: { nurse } });
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          backgroundImage: `url("src/assets/0b6b4550-5855-4bce-81dd-4ea32f592192.jpg")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '40px 0',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#ad1457',
              mb: 4,
              backgroundColor: '#fff8e1cc',
              borderRadius: 2,
              p: 2,
              boxShadow: 2
            }}
          >
            💖 Our Trusted Nurses
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {nurses.map((nurse) => (
              <Grid item xs={12} sm={6} md={6} key={nurse.id} sx={{ animation: 'fadeIn 0.6s ease-in' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #f8bbd0',
                    borderRadius: 3,
                    boxShadow: '0 8px 20px rgba(255, 171, 145, 0.25)',
                    backgroundColor: '#fffde7cc',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.01)' }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={nurse.image}
                    alt={`Nurse ${nurse.name}`}
                    sx={{ objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                  />

                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {nurse.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {nurse.name}
                      </Typography>
                    }
                    subheader={`Age: ${nurse.age}`}
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      🏠 Address: {typeof nurse.address === 'string'
                        ? nurse.address
                        : `${nurse.address.street || 'N/A'}, ${nurse.address.city || ''}, ${nurse.address.pincode || ''}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ☎️ Contact: {nurse.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      ⭐ Rating:
                      <Rating
                        value={parseFloat(nurse.rating)}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{ verticalAlign: 'middle', ml: 1 }}
                      />
                      ({nurse.rating})
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, fontStyle: 'italic' }}
                    >
                      “{nurse.wordsOfTrust}”
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        background: '#f48fb1',
                        '&:hover': { backgroundColor: '#f06292' }
                      }}
                      onClick={() => requestNurse(nurse._id)}
                      disabled={requestedNurses.includes(nurse._id)}
                    >
                      {requestedNurses.includes(nurse._id) ? "Requested" : "Request"}
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleViewProfile(nurse)}
                      sx={{
                        borderColor: '#ffccbc',
                        color: '#ad1457',
                        '&:hover': {
                          backgroundColor: '#ffe0b2',
                          borderColor: '#f8bbd0'
                        }
                      }}
                    >
                      Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

  
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default NurseCards;
