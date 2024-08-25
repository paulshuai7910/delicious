//Calculating distance
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // The radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; //
  return distance;
}

//Filter the 20 closest food trucks
export function findNearestRestaurants(userLat, userLon, restaurants) {
  const restaurantsWithDistance = restaurants.map((restaurant) => {
    const distance = getDistance(
      userLat,
      userLon,
      restaurant.Latitude,
      restaurant.Longitude
    );
    return { ...restaurant, distance };
  });

  // Sort by distance
  restaurantsWithDistance.sort((a, b) => a.distance - b.distance);

  return restaurantsWithDistance.slice(0, 20);
}
