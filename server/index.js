const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const source = process.env.ATLAS_URI;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const mongoose = require('mongoose');

mongoose.connect(source);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('DB connected.');
});
//MiddleWare

const salonRouter = require('./routes/salons');
const stateRouter = require('./routes/states');
const cityRouter = require('./routes/cities');
const areaRouter = require('./routes/areas');
const authRouter = require('./routes/auth');

app.use('/salons', salonRouter);
app.use('/states', stateRouter);
app.use('/cities', cityRouter);
app.use('/areas', areaRouter);
app.use('/auth', authRouter);

app.listen(PORT, () =>
  console.log(`Server is listening.We are live at ${PORT}`)
);
