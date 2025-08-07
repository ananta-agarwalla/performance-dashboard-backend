const express = require("express");
const router = express.Router();

// Import shared device data system
const { getCurrentDeviceData } = require("../shared/deviceData");

// GET /storage/devices - Fetches all storage devices for the main dashboard overview table
router.get("/devices", (req, res) => {
  try {
    // Get consistent device data (shared across all APIs)
    const deviceData = getCurrentDeviceData();

    // Sort devices by deviceScore in ascending order (lowest to highest)
    const sortedDevices = deviceData.sort(
      (a, b) => a.deviceScore - b.deviceScore
    );

    res.json({
      devices: sortedDevices,
      timestamp: new Date().toISOString(),
      count: sortedDevices.length,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch storage devices",
        details: error.message,
      },
    });
  }
});

// GET /storage/devices/:systemId - Fetches detailed information for a specific storage system
router.get("/devices/:systemId", (req, res) => {
  try {
    const { systemId } = req.params;

    // Convert systemId to number if it's numeric, otherwise keep as string
    const id = isNaN(systemId) ? systemId : parseInt(systemId);

    // Get consistent device data
    const deviceData = getCurrentDeviceData();
    const device = deviceData.find((d) => d.id === id);

    if (!device) {
      return res.status(404).json({
        error: {
          code: "DEVICE_NOT_FOUND",
          message: `Storage device with ID ${systemId} not found`,
        },
      });
    }

    res.json({
      device: device,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch storage device details",
        details: error.message,
      },
    });
  }
});

module.exports = router;
