import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/0b6b4550-5855-4bce-81dd-4ea32f592192.jpg';
import {
  Box,
  Typography,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import axios from 'axios';

const NursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nurse, setNurse] = useState(null);

  useEffect(() => {
    const nurseFromState = location.state?.nurse;

    if (!nurseFromState) {
      alert("Access denied. Please log in first.");
      navigate('/login');
    } else {
      fetchNurse(nurseFromState._id);
    }
  }, [location.state, navigate]);

  const fetchNurse = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/nurse/${id}`);
      setNurse(res.data);
    } catch (err) {
      console.error("Error fetching nurse data:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nurse');
    navigate('/');
  };

  const handleViewCustomer = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/nurse/${nurse._id}`);
      navigate('/assigned-customer', { state: { nurse: res.data } });
    } catch (error) {
      alert("Couldn't fetch updated nurse data.");
    }
  };

  const acceptRequest = async (customerId) => {
    try {
      await axios.post(`http://localhost:3000/nurse/accept/${nurse._id}`, { customerId });
      alert("Appointment accepted!");
      fetchNurse(nurse._id);
    } catch (err) {
      console.error(err);
      alert("Failed to accept appointment.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/nurse/delete/${nurse._id}`);
      alert("Account deleted successfully.");
      localStorage.removeItem('nurse');
      navigate('/');
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!nurse) return null;

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
        padding: 3,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          padding: 5,
          maxWidth: 700,
          width: '100%',
          borderRadius: '25px',
          background: 'linear-gradient(to bottom right, #ffeef0, #fff9e6)',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#c2185b',
            fontWeight: 'bold',
            mb: 3,
            textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
          }}
        >
          Welcome, {nurse.name || 'Nurse'}!
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#6d4c41' }}>
            🧑‍⚕️ Profile Summary:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: '#333', fontSize: '1.05rem' }}>
            <li><strong>Name:</strong> {nurse.name}</li>
            <li><strong>Email:</strong> {nurse.email}</li>
            <li><strong>Phone:</strong> {nurse.phone || 'N/A'}</li>
            <li><strong>Role:</strong> {nurse.role || 'Registered Nurse'}</li>
            <li><strong>Shift:</strong> {nurse.shift || 'Morning'}</li>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            backgroundColor: 'rgba(255, 228, 225, 0.4)',
            borderRadius: '10px',
            p: 3,
            mb: 4,
          }}
        >
          <Typography variant="h6" gutterBottom color="textSecondary">
            ✅ Daily Checklist:
          </Typography>
          <FormControlLabel control={<Checkbox />} label="Checked Vitals" />
          <FormControlLabel control={<Checkbox />} label="Given Medication" />
          <FormControlLabel control={<Checkbox />} label="Updated Records" />
          <FormControlLabel control={<Checkbox />} label="Emergency Check" />
        </Box>

        <Typography variant="h6" gutterBottom>🕐 Pending Requests:</Typography>
        {(nurse?.pendingRequests?.length ?? 0) === 0 ? (
          <Typography color="textSecondary">No requests yet</Typography>
        ) : (
          nurse.pendingRequests.map((req, index) => (
            <Paper key={index} sx={{ p: 2, my: 1, background: '#fff8e1' }}>
              <Typography><strong>Name:</strong> {req.name}</Typography>
              <Typography><strong>Email:</strong> {req.email}</Typography>
              <Typography><strong>Phone:</strong> {req.phone}</Typography>
              <Button
                onClick={() => acceptRequest(req.customerId)}
                variant="contained"
                size="small"
                sx={{
                  mt: 1,
                  background: 'linear-gradient(135deg, #f8bbd0, #ffe082)',
                  color: '#000',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f48fb1, #ffd54f)',
                  }
                }}
              >
                Accept
              </Button>
            </Paper>
          ))
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #fce4ec, #fff9c4)',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(135deg, #f8bbd0, #fff59d)',
              }
            }}
            onClick={handleViewCustomer}
          >
            View My Customer
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAccount}
            sx={{ borderWidth: '2px' }}
          >
            Delete Account
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              mt: 2,
              background: 'linear-gradient(135deg, #f8bbd0, #ffe082)',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(135deg, #f48fb1, #ffd54f)',
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NursePage;
