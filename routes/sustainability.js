const express = require("express");
const router = express.Router();

// Import shared device data system
const { getCurrentDeviceData } = require("../shared/deviceData");
// Import sorting utilities
const { sortDevices, parseSortParams } = require("../utils/sorting");

// GET /sustainability/metrics - Fetches sustainability-focused data
// Query parameters: ?sortBy=greenScore&sortOrder=asc
router.get("/metrics", (req, res) => {
  try {
    // Get consistent device data (shared across all APIs)
    const deviceData = getCurrentDeviceData();

    // Parse sorting parameters from query string
    const { sortBy, sortOrder } = parseSortParams(req.query);

    // Transform data to focus on sustainability metrics
    const sustainabilityData = deviceData.map((device) => ({
      // Static values
      id: device.id,
      name: device.name,
      type: device.type,
      capacity: device.capacity,

      // Sustainability-focused metrics
      greenScore: device.greenScore,
      sustainability: device.sustainability,
      price: device.price,
      energyConsumption: device.energyConsumption,
      carbonFootprint: device.carbonFootprint,
      recyclableComponents: device.recyclableComponents,
      energyStarRating: device.energyStarRating,
      renewableEnergyUsage: device.renewableEnergyUsage,
      lastUpdated: device.lastUpdated,
    }));

    // Sort devices based on query parameters (default: greenScore ascending)
    const sortedSustainabilityData = sortDevices(sustainabilityData, sortBy, sortOrder);

    res.json({
      devices: sortedSustainabilityData,
      timestamp: new Date().toISOString(),
      count: sortedSustainabilityData.length,
      sorting: {
        sortBy,
        sortOrder,
        availableFields: ['deviceScore', 'score', 'greenScore', 'featureScore']
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch sustainability metrics",
        details: error.message,
      },
    });
  }
});

module.exports = router;
