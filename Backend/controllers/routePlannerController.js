const turf = require('@turf/turf');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const nearestNeigborTSP = require('../utils/tsp');
const Farm = require('../models/farmModel');

// Calculate a distance matrix for a given array of users
function calculateDistanceMatrix(users) {

  // Start with empty array to store calculated distances 
  const distances = [];

  for (let i = 0; i < users.length; i++) {
    // Create an empty array within 'distances' for each user
    distances[i] = []; 

    for (let j = 0; j < users.length; j++) {
      if (i === j) {
        // Set distance between the same user to 0
        distances[i][j] = 0; 
      } else {
        // Calculate the distance between the coordinates of users 'i' and 'j'
        distances[i][j] = getDistance(users[i].coordinates, users[j].coordinates);
      }
    }
  }
  // Return the resulting 'distances' matrix. 
  return distances;
}

// Calculates the distance between two sets of coordinates using the Haversine forrmula
function getDistance(locationA, locationB) {
  return turf.distance(
    turf.point([locationA.longitude, locationA.latitude]),
    turf.point([locationB.longitude, locationB.latitude]),
    { units: 'kilometers' } 
  );
}


const getPlan = catchAsyncErrors(async (req, res, next) => {
  const farmNames = req.body.farmNames;

  // Fetch farmes based on the provided names
  const farms = await Farm.find({ name: { $in: farmNames } }).select('name coordinates');

  if (farms.length === 0) {
    return next(new ErrorHandler('No farms found for the provided names', 404));
  }

  const distanceMatrix = calculateDistanceMatrix(farms);
  const route = nearestNeigborTSP(distanceMatrix);

  res.status(200).json({
    success: true,
    route,
    farms
  });
});


module.exports = {
  getPlan,
};

