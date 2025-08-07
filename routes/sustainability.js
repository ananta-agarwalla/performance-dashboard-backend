const express = require('express');
const router = express.Router();

// Mock sustainability data
const sustainabilityData = [
  {
    id: 1,
    name: "BLR-CZ234402KF",
    type: "HPE GreenLake For File Storage",
    greenScore: 98,
    sustainability: {
      powerEfficiency: 92,
      carbonReduction: 78,
      circularEconomy: 85
    },
    capacity: "100TB",
    price: 45000
  },
  {
    id: 2,
    name: "SYD-AB123456CD",
    type: "HPE Primera",
    greenScore: 88,
    sustainability: {
      powerEfficiency: 88,
      carbonReduction: 82,
      circularEconomy: 90
    },
    capacity: "50TB",
    price: 65000
  },
  {
    id: 3,
    name: "NYC-EF789012GH",
    type: "HPE Nimble Storage",
    greenScore: 85,
    sustainability: {
      powerEfficiency: 85,
      carbonReduction: 75,
      circularEconomy: 88
    },
    capacity: "25TB",
    price: 28000
  }
];

// GET /sustainability/metrics - Fetches sustainability-focused data
router.get('/metrics', (req, res) => {
  try {
    res.json({
      devices: sustainabilityData
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch sustainability metrics",
        details: error.message
      }
    });
  }
});

module.exports = router;
