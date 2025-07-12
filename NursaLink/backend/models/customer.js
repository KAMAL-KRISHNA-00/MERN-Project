const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  role: {
    type: String,
    default: 'customer'
  }
});

const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;
