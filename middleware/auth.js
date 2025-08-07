// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Access token is required"
      }
    });
  }

  // In a real application, you would verify the token against your auth service
  // For now, we'll check if it matches the expected token from environment variables
  const expectedToken = process.env.VITE_API_TOKEN || 'your_bearer_token_here';
  
  if (token !== expectedToken) {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Invalid or expired token"
      }
    });
  }

  // Token is valid, proceed to next middleware
  next();
};

module.exports = {
  authenticateToken
};
