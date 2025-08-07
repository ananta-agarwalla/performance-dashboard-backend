const express = require("express");
const router = express.Router();

// Import shared device data system
const { getCurrentDeviceData } = require("../shared/deviceData");

// GET /performance/metrics - Fetches performance-focused data
router.get("/metrics", (req, res) => {
  try {
    // Get consistent device data (shared across all APIs)
    const deviceData = getCurrentDeviceData();

    // Transform data to focus on performance metrics
    const performanceData = deviceData.map((device) => ({
      // Static values
      id: device.id,
      name: device.name,
      type: device.type,
      capacity: device.capacity,

      // Performance-focused metrics
      score: device.score,
      readSpeed: device.readSpeed,
      writeSpeed: device.writeSpeed,
      iops: device.iops,
      latency: device.latency,
      throughput: device.throughput,
      cpuUtilization: device.cpuUtilization,
      memoryUtilization: device.memoryUtilization,
      networkUtilization: device.networkUtilization,
      queueDepth: device.queueDepth,
      responseTime: device.responseTime,
      status: device.status,
      utilizationPercent: device.utilizationPercent,
      temperatureCelsius: device.temperatureCelsius,
      lastUpdated: device.lastUpdated,
    }));

    // Sort devices by score in ascending order (lowest to highest)
    const sortedPerformanceData = performanceData.sort(
      (a, b) => a.score - b.score
    );

    res.json({
      devices: sortedPerformanceData,
      timestamp: new Date().toISOString(),
      count: sortedPerformanceData.length,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch performance metrics",
        details: error.message,
      },
    });
  }
});

module.exports = router;
