const express = require('express');
const router = express.Router();

// Mock data for storage devices
const mockDevices = [
  {
    id: 1,
    name: "BLR-CZ234402KF",
    type: "HPE GreenLake For File Storage",
    deviceScore: 98,
    score: 99,
    greenScore: 98,
    featureScore: 97,
    capacity: "100TB",
    readSpeed: 3500,
    writeSpeed: 3200,
    iops: 120000,
    latency: 0.1,
    throughput: 6800,
    price: 45000,
    sustainability: {
      powerEfficiency: 92,
      carbonReduction: 78,
      circularEconomy: 85
    },
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Advanced",
        tiering: "Automated"
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA"]
      },
      availability: ["Auto-failover", "Hot-spare", "RAID"],
      management: ["REST API", "Cloud Integration", "AI Analytics"],
      protocols: ["NFS", "SMB", "REST API"]
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB", "REST API"]
  },
  {
    id: 2,
    name: "SYD-AB123456CD",
    type: "HPE Primera",
    deviceScore: 95,
    score: 96,
    greenScore: 88,
    featureScore: 94,
    capacity: "50TB",
    readSpeed: 4200,
    writeSpeed: 3800,
    iops: 150000,
    latency: 0.08,
    throughput: 8000,
    price: 65000,
    sustainability: {
      powerEfficiency: 88,
      carbonReduction: 82,
      circularEconomy: 90
    },
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Standard",
        tiering: "Automated"
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA", "LDAP"]
      },
      availability: ["Auto-failover", "Clustering", "RAID"],
      management: ["REST API", "Cloud Integration", "AI Analytics", "CLI"],
      protocols: ["FC", "iSCSI", "NVMe-oF"]
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["FC", "iSCSI", "NVMe-oF"]
  },
  {
    id: 3,
    name: "NYC-EF789012GH",
    type: "HPE Nimble Storage",
    deviceScore: 92,
    score: 93,
    greenScore: 85,
    featureScore: 91,
    capacity: "25TB",
    readSpeed: 2800,
    writeSpeed: 2500,
    iops: 95000,
    latency: 0.15,
    throughput: 5300,
    price: 28000,
    sustainability: {
      powerEfficiency: 85,
      carbonReduction: 75,
      circularEconomy: 88
    },
    features: {
      dataManagement: {
        deduplication: "Standard",
        compression: "Advanced",
        tiering: "Manual"
      },
      security: {
        encryption: "AES-128",
        accessControl: ["RBAC"]
      },
      availability: ["Auto-failover", "RAID"],
      management: ["REST API", "Web Interface"],
      protocols: ["iSCSI", "FC"]
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["iSCSI", "FC"]
  }
];

// GET /storage/devices - Fetches all storage devices for the main dashboard overview table
router.get('/devices', (req, res) => {
  try {
    res.json({
      devices: mockDevices
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch storage devices",
        details: error.message
      }
    });
  }
});

// GET /storage/devices/:systemId - Fetches detailed information for a specific storage system
router.get('/devices/:systemId', (req, res) => {
  try {
    const { systemId } = req.params;
    
    // Convert systemId to number if it's numeric, otherwise keep as string
    const id = isNaN(systemId) ? systemId : parseInt(systemId);
    
    const device = mockDevices.find(d => d.id === id);
    
    if (!device) {
      return res.status(404).json({
        error: {
          code: "DEVICE_NOT_FOUND",
          message: `Storage device with ID ${systemId} not found`
        }
      });
    }

    res.json({
      device: device
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch storage device details",
        details: error.message
      }
    });
  }
});

module.exports = router;
