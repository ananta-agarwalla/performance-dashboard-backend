const express = require("express");
const router = express.Router();

// Import shared device data system
const { getCurrentDeviceData } = require("../shared/deviceData");

// GET /features/comparison - Fetches feature-focused data
router.get("/comparison", (req, res) => {
  try {
    // Get consistent device data (shared across all APIs)
    const deviceData = getCurrentDeviceData();

    // Transform data to focus on feature metrics
    const featuresData = deviceData.map((device) => ({
      // Static values
      id: device.id,
      name: device.name,
      type: device.type,
      capacity: device.capacity,
      features: device.features,
      snapshots: device.snapshots,
      replication: device.replication,
      protocols: device.protocols,

      // Feature-focused metrics
      featureScore: device.featureScore,
      uptimePercentage: device.uptimePercentage,
      featureUtilization: device.featureUtilization,
      securityCompliance: device.securityCompliance,
      managementEfficiency: device.managementEfficiency,
      status: device.status,
      lastUpdated: device.lastUpdated,
    }));

    // Sort devices by featureScore in ascending order (lowest to highest)
    const sortedFeaturesData = featuresData.sort(
      (a, b) => a.featureScore - b.featureScore
    );

    res.json({
      devices: sortedFeaturesData,
      timestamp: new Date().toISOString(),
      count: sortedFeaturesData.length,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch feature comparison data",
        details: error.message,
      },
    });
  }
});

module.exports = router;
