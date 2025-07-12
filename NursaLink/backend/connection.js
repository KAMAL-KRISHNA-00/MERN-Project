const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kamalkrishna428:hello123@cluster0.mdv7jd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log(err)
  })