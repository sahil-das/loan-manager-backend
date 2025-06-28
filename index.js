const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://loan-manager-frontend-three.vercel.app',
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on port', PORT));


// Optional root endpoint
app.get('/', (req, res) => {
  res.send('🟢 API is running and awake!');
});

// 🔄 Self-ping script (to prevent Render sleep)
const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}`;

setInterval(() => {
  fetch(SELF_URL)
    .then(res => console.log(`🔁 Self-ping status: ${res.status}`))
    .catch(err => console.error('❌ Self-ping failed:', err.message));
}, 5 * 60 * 1000); // every 5 minutes
