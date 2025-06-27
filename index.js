const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/borrow', require('./routes/borrow'));

app.listen(5000, () => console.log('Server running on 5000'));