const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://loan-manager-frontend-three.vercel.app'
  'https://loan-manager-frontend-git-main-sahil-das-projects-b72f7872.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/borrow', require('./routes/borrow'));
app.use('/api/admin', require('./routes/admin'));

app.listen(5000, () => console.log('Server running on 5000'));