const ErrorHandler = require('./errorHandler');

function nearestNeigborTSP(distances) {
  // Initialize the number of users(farmers) to visit
  const numUsers = distances.length;

  // Track the visited farnmers
  const visited = Array(numUsers).fill(false);

  // Initialize the route with the starting point (farmer 0)
  const route = [0];
  
  // Mark the starting farmer as visited
  visited[0] = true;

  // Initialize the current farmer
  let currentUser = 0;

  // Check if the distances array is symmetric
  // for (let i = 0; i < numUsers; i++) {
  //   for(let j = i + 1; j < numUsers; j++) {
  //     if (distances[i][j] !== distances[j][i]) {
  //       throw new ErrorHandler('Distances array is not symmetric!', 400);
  //     }
  //   }
  // }

  for (let i = 1; i < numUsers; i++) {
    let nearest = -1; // The index of the nearest unvisited farmer
    let nearestDistance = Infinity; // Distance to the nearest farmer

    // Find the nearest unvisited farmer
    for (let j = 0; j < numUsers; j++) {
      if (!visited[j] && distances[currentUser][j] < nearestDistance) {
        nearest = j;
        nearestDistance = distances[currentUser][j];
      }
    }

    // Add the nearest farmer to the route
    route.push(nearest);
    visited[nearest] = true;
    currentUser = nearest;
  }
    
  route.push(0); // Add the starting point back to close the loop

  // Return the resulting route
  return route;
}

module.exports = nearestNeigborTSP;