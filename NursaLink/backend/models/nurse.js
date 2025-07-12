const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  age: {
    type: Number,
    default: null,
  },
  address:String,
  role: {
    type: String,
    default: 'nurse'
  },
  pendingRequests: [
    {
      customerId: String,
      name: String,
      email: String,
      phone: String
    }
  ],
  appointments: [
    {
      customerId: String,
      name: String,
      email: String,
      phone: String
    }
  ]
});

module.exports = mongoose.model("nurse", nurseSchema);
