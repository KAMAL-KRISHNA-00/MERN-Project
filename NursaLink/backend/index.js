const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('./connection'); // MongoDB connection setup

// Models
const cusmodel = require('./models/customer');
const nursemodel = require('./models/nurse');
const adminModel = require('./models/admin');
const feedbackModel = require('./models/feedback');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// ------------------ 💌 FEEDBACK ROUTES ------------------

// Save feedback
app.post('/feedback/add', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).send("All fields are required");

    await feedbackModel({ name, email, message }).save();
    res.status(200).send("Feedback saved successfully!");
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).send("Server error");
  }
});

// View feedbacks
app.get('/feedback/view', async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("❌ Error fetching feedbacks:", err);
    res.status(500).send("Server error");
  }
});

// ------------------ 👤 CUSTOMER ROUTES ------------------

app.post('/customer/add', async (req, res) => {
  await cusmodel(req.body).save();
  res.send("Customer added");
});

app.get('/customer/view', async (req, res) => {
  const data = await cusmodel.find();
  res.send(data);
});

app.put('/customer/update/:id', async (req, res) => {
  await cusmodel.findByIdAndUpdate(req.params.id, req.body);
  res.send("Customer updated");
});

app.delete('/customer/delete/:id', async (req, res) => {
  await cusmodel.findByIdAndDelete(req.params.id);
  res.send("Customer deleted");
});

// ------------------ 👩‍⚕️ NURSE ROUTES ------------------

app.post('/nurse/add', async (req, res) => {
  await nursemodel(req.body).save();
  res.send("Nurse added");
});

app.get('/nurse/view', async (req, res) => {
  const data = await nursemodel.find();
  res.send(data);
});

app.get('/nurse/:id', async (req, res) => {
  try {
    const nurse = await nursemodel.findById(req.params.id);
    if (!nurse) return res.status(404).send("Nurse not found");
    res.json(nurse);
  } catch (err) {
    console.error("Error fetching nurse by ID:", err);
    res.status(500).send("Server error");
  }
});

app.put('/nurse/update/:id', async (req, res) => {
  try {
    const updated = await nursemodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
    });

    if (!updated) return res.status(404).send("Nurse not found");
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Nurse update error:", err);
    res.status(500).send("Failed to update nurse");
  }
});

app.delete('/nurse/delete/:id', async (req, res) => {
  await nursemodel.findByIdAndDelete(req.params.id);
  res.send("Nurse deleted");
});

// ------------------ 🧑‍💼 ADMIN ROUTES ------------------

app.post('/admin/add', async (req, res) => {
  await adminModel(req.body).save();
  res.send("Admin added");
});

app.get('/admin/view', async (req, res) => {
  const data = await adminModel.find();
  res.send(data);
});

app.put('/admin/update/:id', async (req, res) => {
  await adminModel.findByIdAndUpdate(req.params.id, req.body);
  res.send("Admin updated");
});

app.delete('/admin/delete/:id', async (req, res) => {
  await adminModel.findByIdAndDelete(req.params.id);
  res.send("Admin deleted");
});

// ------------------ 🔐 LOGIN ROUTE ------------------

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Customer login
    const customer = await cusmodel.findOne({ email, password });
    if (customer) {
      return res.status(200).json({
        role: 'customer',
        message: 'Login successful!',
        user: customer,
      });
    }

    // Nurse login with profile check
    const nurse = await nursemodel.findOne({ email, password });
    if (nurse) {
      const isIncompleteProfile = !nurse.age || !nurse.address;

      return res.status(200).json({
        role: 'nurse',
        message: isIncompleteProfile
          ? 'Login successful, but profile is incomplete.'
          : 'Login successful!',
        user: nurse,
        incompleteProfile: isIncompleteProfile,
      });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------ 💼 APPOINTMENT ROUTES ------------------

// Request nurse
app.post('/nurse/request/:nurseId', async (req, res) => {
  try {
    const nurse = await nursemodel.findById(req.params.nurseId);
    if (!nurse) return res.status(404).send("Nurse not found");

    nurse.pendingRequests = nurse.pendingRequests || [];
    nurse.pendingRequests.push(req.body);
    await nurse.save();

    res.status(200).send("Request sent to nurse");
  } catch (error) {
    console.error("❌ Request error:", error);
    res.status(500).send("Failed to send request");
  }
});

// Accept request
app.post('/nurse/accept/:nurseId', async (req, res) => {
  try {
    const nurse = await nursemodel.findById(req.params.nurseId);
    const { customerId } = req.body;

    const requestIndex = nurse.pendingRequests.findIndex(r => r.customerId === customerId);
    if (requestIndex === -1) return res.status(404).send("Request not found");

    const acceptedRequest = nurse.pendingRequests.splice(requestIndex, 1)[0];
    nurse.appointments.push(acceptedRequest);
    await nurse.save();

    res.status(200).send("Appointment confirmed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to accept request");
  }
});

// View nurse appointments
app.get('/nurse/appointments/:nurseId', async (req, res) => {
  try {
    const nurse = await nursemodel.findById(req.params.nurseId);
    if (!nurse) return res.status(404).send("Nurse not found");

    res.json(nurse.appointments || []);
  } catch (error) {
    console.error("❌ Fetch appointments error:", error);
    res.status(500).send("Server error");
  }
});

// View customer’s nurses (accepted)
app.get('/customer/nurses/:customerId', async (req, res) => {
  try {
    const nurses = await nursemodel.find({
      'appointments.customerId': req.params.customerId,
    });

    const filtered = nurses.map(nurse => ({
      _id: nurse._id,
      name: nurse.name,
      email: nurse.email,
      phone: nurse.phone,
      shift: nurse.shift,
      age: nurse.age,
      address: nurse.address,
      role: nurse.role,
    }));

    res.status(200).json(filtered);
  } catch (err) {
    console.error("❌ Fetch nurse list error:", err);
    res.status(500).send("Server error");
  }
});

// ------------------ 🚀 START SERVER ------------------

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
