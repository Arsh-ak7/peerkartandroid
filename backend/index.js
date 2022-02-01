require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1/peerkart', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Mongo connected');
  })
  .catch(err => {
    console.log(err);
  });

app.use('/api/users', userRoute);

app.listen(8080, () => {
  console.log('server started');
});
