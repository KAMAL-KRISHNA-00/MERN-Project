import React from 'react';
import bgImage from '../assets/bg.jpg';
import { Button } from '@mui/material';
import Navbar from '../components/Navbar';
import './Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        color: 'white',
        textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
        paddingTop: '100px',
      }}
    >
      <Navbar />

      <div style={{ position: 'absolute', top: '60px', left: '30px' }}><br/><br/>
        <h1 style={{ margin: 0, fontSize: '40px' ,color: 'linear-gradient(135deg, #d81b60, #ffca28)'}}>Bridging you to trusted care..</h1>
        <p style={{ fontSize: '18px', marginTop: '4px' ,color:'black'}}>
          Proceed to Login
        </p>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
          }}
        >
           <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            
            style={{
  background: 'linear-gradient(135deg, #d81b60, #ffca28)',
  
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  color: 'white',
  padding: '6px 20px',
  borderRadius: '10px',
}}

          >
            LOG IN
          </Button>
          </Link>
           <Link to="/login" style={{ textDecoration: 'none' }}>

          
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
