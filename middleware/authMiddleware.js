const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(auth.split(' ')[1], ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}