const express = require('express');
const router = express.Router();

// Mock features data
const featuresData = [
  {
    id: 1,
    name: "BLR-CZ234402KF",
    type: "HPE GreenLake For File Storage",
    featureScore: 97,
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
    featureScore: 94,
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
    featureScore: 91,
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

// GET /features/comparison - Fetches feature comparison data
router.get('/comparison', (req, res) => {
  try {
    res.json({
      devices: featuresData
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch feature comparison data",
        details: error.message
      }
    });
  }
});

module.exports = router;
