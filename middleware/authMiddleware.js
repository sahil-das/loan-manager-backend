const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  let token;

  // Check Authorization header
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Fallback to token cookie
    token = req.cookies.token;
  }

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
};