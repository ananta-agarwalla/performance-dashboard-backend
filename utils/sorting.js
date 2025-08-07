// Sorting utility functions for API endpoints

/**
 * Sorts an array of devices based on the specified field and direction
 * @param {Array} devices - Array of device objects
 * @param {string} sortBy - Field to sort by (deviceScore, score, greenScore, featureScore)
 * @param {string} sortOrder - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array of devices
 */
function sortDevices(devices, sortBy = 'deviceScore', sortOrder = 'asc') {
  // Valid sort fields - only the 4 main score parameters
  const validSortFields = [
    'deviceScore',    // Device Score
    'score',          // Performance Score  
    'greenScore',     // Green Score
    'featureScore'    // Feature Score
  ];

  // Validate sort field
  if (!validSortFields.includes(sortBy)) {
    sortBy = 'deviceScore'; // Default fallback
  }

  // Validate sort order
  const order = sortOrder.toLowerCase() === 'desc' ? 'desc' : 'asc';

  return devices.sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    // Handle different data types
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      // String comparison (case-insensitive)
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
      
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      // Numeric comparison
      if (order === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }
  });
}

/**
 * Parses and validates sorting parameters from query string
 * @param {Object} query - Express req.query object
 * @returns {Object} Validated sorting parameters
 */
function parseSortParams(query) {
  const { sortBy, sortOrder } = query;
  
  return {
    sortBy: sortBy || 'deviceScore',
    sortOrder: sortOrder || 'asc'
  };
}

module.exports = {
  sortDevices,
  parseSortParams
};
