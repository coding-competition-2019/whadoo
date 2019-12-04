import {Coords} from '../entities/places';

const unit = 'K';

// Expects c1, c2 where coordinates:{lat,lng}
export function coordDistance(c1: Coords, c2: Coords): number {
  const lat1 = c1.lat;
  const lat2 = c2.lat;
  const lon1 = c1.lng;
  const lon2 = c2.lng;

  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  } else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    return dist;
  }
}
