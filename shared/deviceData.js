// Shared device data generator for consistent metrics across all APIs
const deviceTemplates = [
  {
    id: 1,
    name: "BLR-CZ234402KF",
    type: "HPE GreenLake For File Storage",
    capacity: "100TB",
    basePrice: 45000,
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Advanced",
        tiering: "Automated",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA"],
      },
      availability: ["Auto-failover", "Hot-spare", "RAID"],
      management: ["REST API", "Cloud Integration", "AI Analytics"],
      protocols: ["NFS", "SMB", "REST API"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB", "REST API"],
  },
  {
    id: 2,
    name: "SYD-AB123456CD",
    type: "HPE GreenLake For File Storage",
    capacity: "50TB",
    basePrice: 65000,
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Standard",
        tiering: "Automated",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA", "LDAP"],
      },
      availability: ["Auto-failover", "Clustering", "RAID"],
      management: ["REST API", "Cloud Integration", "AI Analytics", "CLI"],
      protocols: ["FC", "iSCSI", "NVMe-oF"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["FC", "iSCSI", "NVMe-oF"],
  },
  {
    id: 3,
    name: "NYC-EF789012GH",
    type: "HPE GreenLake For File Storage",
    capacity: "25TB",
    basePrice: 28000,
    features: {
      dataManagement: {
        deduplication: "Standard",
        compression: "Advanced",
        tiering: "Manual",
      },
      security: {
        encryption: "AES-128",
        accessControl: ["RBAC"],
      },
      availability: ["Auto-failover", "RAID"],
      management: ["REST API", "Web Interface"],
      protocols: ["iSCSI", "FC"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["iSCSI", "FC"],
  },
  {
    id: 4,
    name: "LON-XY567890ZA",
    type: "HPE GreenLake For File Storage",
    capacity: "75TB",
    basePrice: 52000,
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Advanced",
        tiering: "Automated",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA", "LDAP"],
      },
      availability: ["Auto-failover", "Hot-spare", "RAID", "Clustering"],
      management: ["REST API", "Cloud Integration", "AI Analytics"],
      protocols: ["NFS", "SMB", "iSCSI"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB", "iSCSI"],
  },
  {
    id: 5,
    name: "TKY-MN345678BC",
    type: "HPE GreenLake For File Storage",
    capacity: "150TB",
    basePrice: 78000,
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Advanced",
        tiering: "Automated",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA", "LDAP", "SSO"],
      },
      availability: ["Auto-failover", "Hot-spare", "RAID", "Clustering"],
      management: ["REST API", "Cloud Integration", "AI Analytics", "CLI"],
      protocols: ["NFS", "SMB", "FC", "iSCSI"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB", "FC", "iSCSI"],
  },
  {
    id: 6,
    name: "DXB-PQ901234DE",
    type: "HPE GreenLake For File Storage",
    capacity: "30TB",
    basePrice: 32000,
    features: {
      dataManagement: {
        deduplication: "Standard",
        compression: "Standard",
        tiering: "Manual",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA"],
      },
      availability: ["Auto-failover", "RAID"],
      management: ["REST API", "Web Interface"],
      protocols: ["NFS", "SMB"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB"],
  },
  {
    id: 7,
    name: "FRA-ST456789EF",
    type: "HPE GreenLake For File Storage",
    capacity: "200TB",
    basePrice: 95000,
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Advanced",
        tiering: "Automated",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA", "LDAP", "SSO"],
      },
      availability: [
        "Auto-failover",
        "Hot-spare",
        "RAID",
        "Clustering",
        "Geo-replication",
      ],
      management: [
        "REST API",
        "Cloud Integration",
        "AI Analytics",
        "CLI",
        "PowerShell",
      ],
      protocols: ["NFS", "SMB", "FC", "iSCSI", "NVMe-oF"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB", "FC", "iSCSI", "NVMe-oF"],
  },
  {
    id: 8,
    name: "SG-UV123456GH",
    type: "HPE GreenLake For File Storage",
    capacity: "40TB",
    basePrice: 38000,
    features: {
      dataManagement: {
        deduplication: "Advanced",
        compression: "Standard",
        tiering: "Automated",
      },
      security: {
        encryption: "AES-256",
        accessControl: ["RBAC", "MFA"],
      },
      availability: ["Auto-failover", "RAID", "Hot-spare"],
      management: ["REST API", "Cloud Integration", "Web Interface"],
      protocols: ["NFS", "SMB", "iSCSI"],
    },
    snapshots: "Yes",
    replication: "Yes",
    protocols: ["NFS", "SMB", "iSCSI"],
  },
];

// Helper function to generate random values within a range
const randomInRange = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
};

// Helper function to add some variance to a base value
const addVariance = (baseValue, variancePercent = 10) => {
  const variance = baseValue * (variancePercent / 100);
  return randomInRange(baseValue - variance, baseValue + variance);
};

// Cache to store current device data
let currentDeviceData = null;
let lastGeneratedTime = null;
const CACHE_DURATION = 30000; // 30 seconds - ensures consistency across all API calls within polling window

// Function to generate comprehensive device data
const generateDeviceData = () => {
  return deviceTemplates.map((template) => {
    // Generate performance scores based on device ID to ensure distribution across all categories
    // This ensures we have devices in excellent, good, average, and poor categories
    let baseScore, scoreVariance;

    // Distribute devices across performance categories:
    if (template.id === 1 || template.id === 7) {
      // Excellent performers (90+): Devices 1 & 7 (2 devices)
      baseScore = randomInRange(91, 96);
      scoreVariance = 2;
    } else if (template.id === 2 || template.id === 4 || template.id === 5) {
      // Good performers (75-89): Devices 2, 4 & 5 (3 devices)
      baseScore = randomInRange(76, 87);
      scoreVariance = 3;
    } else if (template.id === 3 || template.id === 8) {
      // Average performers (60-74): Devices 3 & 8 (2 devices)
      baseScore = randomInRange(62, 72);
      scoreVariance = 3;
    } else {
      // Poor performer (< 60): Device 6 (1 device)
      baseScore = randomInRange(45, 57);
      scoreVariance = 4;
    }

    // Generate consistent scores with slight variations
    const score = Math.max(
      20,
      Math.min(99, Math.floor(addVariance(baseScore, scoreVariance)))
    );
    const deviceScore = Math.max(score - 3, Math.min(score + 3, 99));

    // Green score and feature score based on overall performance tier but with some variation
    const greenScore = Math.max(
      50,
      Math.min(95, score + randomInRange(-10, 15))
    );
    const featureScore = Math.max(
      60,
      Math.min(98, score + randomInRange(-5, 10))
    );

    // Performance metrics with realistic ranges based on capacity
    const capacityValue = parseInt(template.capacity);
    let baseReadSpeed, baseWriteSpeed, baseIOPS, baseThroughput, baseLatency;

    if (capacityValue >= 150) {
      baseReadSpeed = 3800;
      baseWriteSpeed = 3500;
      baseIOPS = 140000;
      baseThroughput = 7500;
      baseLatency = 0.09;
    } else if (capacityValue >= 100) {
      baseReadSpeed = 3600;
      baseWriteSpeed = 3300;
      baseIOPS = 125000;
      baseThroughput = 7000;
      baseLatency = 0.11;
    } else if (capacityValue >= 50) {
      baseReadSpeed = 3500;
      baseWriteSpeed = 3200;
      baseIOPS = 120000;
      baseThroughput = 6800;
      baseLatency = 0.12;
    } else if (capacityValue >= 30) {
      baseReadSpeed = 3400;
      baseWriteSpeed = 3100;
      baseIOPS = 115000;
      baseThroughput = 6600;
      baseLatency = 0.13;
    } else {
      baseReadSpeed = 3300;
      baseWriteSpeed = 3000;
      baseIOPS = 110000;
      baseThroughput = 6400;
      baseLatency = 0.14;
    }

    // Generate all dynamic metrics once for consistency
    const readSpeed = Math.floor(addVariance(baseReadSpeed, 15));
    const writeSpeed = Math.floor(addVariance(baseWriteSpeed, 15));
    const iops = Math.floor(addVariance(baseIOPS, 20));
    const latency = parseFloat(
      (addVariance(baseLatency, 15) > 0.01
        ? addVariance(baseLatency, 15)
        : baseLatency
      ).toFixed(3)
    );
    const throughput = Math.floor(addVariance(baseThroughput, 18));
    const price = Math.floor(addVariance(template.basePrice, 8));
    const lastUpdated = new Date().toISOString();

    // Sustainability metrics
    const powerEfficiency = randomInRange(80, 95);
    const carbonReduction = randomInRange(70, 90);
    const circularEconomy = randomInRange(75, 92);
    const energyConsumption = randomInRange(150, 300);
    const carbonFootprint = randomInRange(0.2, 0.8);
    const recyclableComponents = randomInRange(70, 95);
    const energyStarRating = randomInRange(4, 5);
    const renewableEnergyUsage = randomInRange(60, 95);

    // Performance metrics
    const cpuUtilization = randomInRange(30, 80);
    const memoryUtilization = randomInRange(40, 85);
    const networkUtilization = randomInRange(20, 70);
    const queueDepth = randomInRange(1, 32);
    const responseTime = parseFloat(
      addVariance(baseLatency * 2, 20).toFixed(3)
    );

    // Feature metrics - declare utilizationPercent first
    const uptimePercentage = randomInRange(98.5, 99.9, 2);
    
    // Simple random capacity generation with different utilization patterns
    const utilizationPercent = randomInRange(15, 95); // Wide range from under-utilized to over-utilized
    
    const temperatureCelsius = randomInRange(18, 32);
    const status = Math.random() > 0.1 ? "online" : "maintenance";

    // Capacity metrics - calculate used capacity based on utilization
    const totalCapacityTB = parseFloat(capacityValue.toFixed(2));
    const usedCapacityTB = parseFloat((totalCapacityTB * (utilizationPercent / 100)).toFixed(2));

    return {
      // Static values that never change
      id: template.id,
      name: template.name,
      type: template.type,
      capacity: template.capacity,
      features: template.features,
      snapshots: template.snapshots,
      replication: template.replication,
      protocols: template.protocols,

      // Dynamic values (same across all APIs for this generation)
      deviceScore,
      score,
      greenScore,
      featureScore,
      readSpeed,
      writeSpeed,
      iops,
      latency,
      throughput,
      price,
      lastUpdated,
      status,
      utilizationPercent,
      temperatureCelsius,

      // Sustainability specific
      sustainability: {
        powerEfficiency,
        carbonReduction,
        circularEconomy,
      },
      energyConsumption,
      carbonFootprint,
      recyclableComponents,
      energyStarRating,
      renewableEnergyUsage,

      // Performance specific
      cpuUtilization,
      memoryUtilization,
      networkUtilization,
      queueDepth,
      responseTime,
      
      // Capacity information
      totalCapacityTB,
      usedCapacityTB,
      availableCapacityTB: parseFloat((totalCapacityTB - usedCapacityTB).toFixed(2)),

      // Feature specific
      uptimePercentage,
      featureUtilization: {
        deduplication: randomInRange(60, 95),
        compression: randomInRange(70, 90),
        tiering: randomInRange(40, 80),
      },
      securityCompliance: {
        encryption: randomInRange(95, 100),
        accessControl: randomInRange(90, 100),
        auditCompliance: randomInRange(85, 98),
      },
      managementEfficiency: {
        automationLevel: randomInRange(70, 95),
        apiResponseTime: randomInRange(50, 200),
        configChanges: randomInRange(5, 25),
      },
    };
  });
};

// Function to get current device data (with caching for consistency)
const getCurrentDeviceData = () => {
  const now = Date.now();

  // If we don't have cached data or it's older than CACHE_DURATION, generate new data
  if (
    !currentDeviceData ||
    !lastGeneratedTime ||
    now - lastGeneratedTime > CACHE_DURATION
  ) {
    currentDeviceData = generateDeviceData();
    lastGeneratedTime = now;
  }

  return currentDeviceData;
};

// Function to determine performance level based on score
const getPerformanceLevel = (score) => {
  if (score >= 90) return "excellent"; // Green - Normal systems
  if (score >= 75) return "good"; // Light green - Normal systems
  if (score >= 60) return "average"; // Orange/Yellow - Warning systems
  return "poor"; // Red - Critical systems
};

// Export functions for use in route files
module.exports = {
  getCurrentDeviceData,
  deviceTemplates,
  getPerformanceLevel,
};
