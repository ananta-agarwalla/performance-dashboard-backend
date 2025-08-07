const express = require('express');
const router = express.Router();

// Mock performance data
const performanceData = [
  {
    id: 1,
    name: "BLR-CZ234402KF",
    type: "HPE GreenLake For File Storage",
    score: 99,
    readSpeed: 3500,
    writeSpeed: 3200,
    iops: 120000,
    latency: 0.1,
    throughput: 6800,
    capacity: "100TB"
  },
  {
    id: 2,
    name: "SYD-AB123456CD",
    type: "HPE Primera",
    score: 96,
    readSpeed: 4200,
    writeSpeed: 3800,
    iops: 150000,
    latency: 0.08,
    throughput: 8000,
    capacity: "50TB"
  },
  {
    id: 3,
    name: "NYC-EF789012GH",
    type: "HPE Nimble Storage",
    score: 93,
    readSpeed: 2800,
    writeSpeed: 2500,
    iops: 95000,
    latency: 0.15,
    throughput: 5300,
    capacity: "25TB"
  }
];

// GET /performance/metrics - Fetches performance-focused data
router.get('/metrics', (req, res) => {
  try {
    res.json({
      devices: performanceData
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch performance metrics",
        details: error.message
      }
    });
  }
});

module.exports = router;
