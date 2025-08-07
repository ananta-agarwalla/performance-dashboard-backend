const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import middleware
const { authenticateToken } = require('./middleware/auth');

// Import routes
const storageRoutes = require('./routes/storage');
const sustainabilityRoutes = require('./routes/sustainability');
const performanceRoutes = require('./routes/performance');
const featuresRoutes = require('./routes/features');

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Performance Dashboard API',
    status: 'Server is running successfully',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      storage: '/storage/devices',
      sustainability: '/sustainability/metrics',
      performance: '/performance/metrics',
      features: '/features/comparison'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API routes - Protected with authentication
app.use('/storage', authenticateToken, storageRoutes);
app.use('/sustainability', authenticateToken, sustainabilityRoutes);
app.use('/performance', authenticateToken, performanceRoutes);
app.use('/features', authenticateToken, featuresRoutes);

// API info endpoint (unprotected)
app.get('/api', (req, res) => {
  res.json({
    message: 'HPE Storage Performance Dashboard API',
    version: '1.0.0',
    baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
    authentication: 'Bearer token required',
    endpoints: {
      'GET /storage/devices': 'Get all storage devices',
      'GET /storage/devices/:systemId': 'Get specific storage device',
      'GET /sustainability/metrics': 'Get sustainability metrics',
      'GET /performance/metrics': 'Get performance metrics',
      'GET /features/comparison': 'Get feature comparison data'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Performance Dashboard Backend API`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
