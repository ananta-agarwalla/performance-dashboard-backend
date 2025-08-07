const express = require("express");
const router = express.Router();

// Import shared device data system
const { getCurrentDeviceData } = require("../shared/deviceData");
// Import sorting utilities
const { sortDevices, parseSortParams } = require("../utils/sorting");

// GET /features/comparison - Fetches feature-focused data
// Query parameters: ?sortBy=featureScore&sortOrder=asc
router.get("/comparison", (req, res) => {
  try {
    // Get consistent device data (shared across all APIs)
    const deviceData = getCurrentDeviceData();

    // Parse sorting parameters from query string
    const { sortBy, sortOrder } = parseSortParams(req.query);

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

      // Extract data reduction information as boolean
      dataReduction: !!(
        device.features?.dataManagement?.deduplication ||
        device.features?.dataManagement?.compression
      ),

      // Feature-focused metrics
      featureScore: device.featureScore,
      uptimePercentage: device.uptimePercentage,
      featureUtilization: device.featureUtilization,
      securityCompliance: device.securityCompliance,
      managementEfficiency: device.managementEfficiency,
      status: device.status,
      lastUpdated: device.lastUpdated,
    }));

    // Sort devices based on query parameters (default: featureScore ascending)
    const sortedFeaturesData = sortDevices(featuresData, sortBy, sortOrder);

    res.json({
      devices: sortedFeaturesData,
      timestamp: new Date().toISOString(),
      count: sortedFeaturesData.length,
      sorting: {
        sortBy,
        sortOrder,
        availableFields: ["deviceScore", "score", "greenScore", "featureScore"],
      },
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
