const express = require("express");
const router = express.Router();

// Import shared device data system
const { getCurrentDeviceData } = require("../shared/deviceData");

// GET /sustainability/metrics - Fetches sustainability-focused data
router.get("/metrics", (req, res) => {
  try {
    // Get consistent device data (shared across all APIs)
    const deviceData = getCurrentDeviceData();

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

    // Sort devices by greenScore in ascending order (lowest to highest)
    const sortedSustainabilityData = sustainabilityData.sort(
      (a, b) => a.greenScore - b.greenScore
    );

    res.json({
      devices: sortedSustainabilityData,
      timestamp: new Date().toISOString(),
      count: sortedSustainabilityData.length,
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
