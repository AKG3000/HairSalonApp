const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const cors = require('cors');
require('dotenv').config();
const source = process.env.ATLAS_URI;
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect(source);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('DB connected.');
});
//MiddleWare

const salonRouter = require('./routes/salons');

app.use('/salons', salonRouter);

app.listen(PORT, () =>
  console.log(`Server is listening.We are live at ${PORT}`)
);
