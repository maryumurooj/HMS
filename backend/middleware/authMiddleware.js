const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  console.log('Auth Middleware - Headers:', req.headers);

  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request object
    req.user = decoded;
    console.log('Token verification successful');

    next();
  } catch (err) {
    console.log('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;