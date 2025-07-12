import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

import Clsignup from './components/Clsignup';
import Layout from './components/Layout';
import bgImage from './assets/bg.jpg';
import NursePage from './components/NursePage';
import CustomerDashboard from './components/CustomerDashboard';
import NurseCards from './components/Nursecards';

import AdminNursecards from './components/AdminNursecards';
import AdminWelcome from './components/AdminWelcome';
import AssignedCustomer from './components/AssignedCustomer';
import MyNurses from './components/MyNurses';
import Feedback from './components/Feedback';
import ContactUs from './components/ContactUs';
import AdminFeedback from './components/AdminFeedback';
import CompleteProfile from './components/CompleteProfile';
import NurseProfile from './components/NurseProfile';
import UpdateNurse from './components/UpdateNurse';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
  index
  element={
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
        paddingTop: '60px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
    
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

     
      <div style={{ position: 'relative', zIndex: 2, padding: '0 30px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>Welcome to NursaLink</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          – Your easy link to comfort and care
        </p>

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '30px',
            borderRadius: '10px',
            fontSize: '17px',
            lineHeight: '1.6',
          }}
        >
          <p>
            At <strong>NursaLink</strong>, we believe that healing begins at home.
          </p>
          <p>
            We are a dedicated team of healthcare professionals committed to providing
            <strong> compassionate, personalized home nursing care </strong> for the elderly,
            patients recovering from surgery, those with chronic illnesses, and individuals
            in need of daily medical assistance.
          </p>
          <p>
            Our mission is to bring <strong>hospital-quality care</strong> into the
            <strong> comfort of your home</strong>, while preserving the dignity,
            independence, and well-being of every person we serve.
          </p>
          <p>
            Whether it’s post-operative recovery, elderly care, physiotherapy support, or
            chronic illness management — <strong>NursaLink is your trusted partner in health</strong>.
          </p>
        </div>
      </div>
    </div>
  }
/>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="clsignup" element={<Clsignup />} />
         <Route path="/nursepage" element={<NursePage/>} />
                        <Route path="/customerdashboard" element={<CustomerDashboard/>} />
                        <Route path="/nursecards" element={<NurseCards/>} />
                        <Route path="/adminnursecards" element={<AdminNursecards/>} />
                        <Route path="/adminwelcome" element={<AdminWelcome/>} />
                        <Route path="/assigned-customer" element={<AssignedCustomer />} />
                        <Route path="/mynurses" element={<MyNurses />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/adminfeedback" element={<AdminFeedback />} />
                        <Route path="/complete-profile" element={<CompleteProfile />} />
                        <Route path="/nurse-profile/:id" element={<NurseProfile />} />
                        <Route path="/update-nurse/:id" element={<UpdateNurse />} />



      </Route>
    </Routes>
  );
}

export default App;
