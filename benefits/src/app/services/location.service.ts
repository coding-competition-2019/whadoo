import {Injectable} from '@angular/core';
import {Coords, Place, Places} from '../entities/places';
import {coordDistance} from "../utilities/distance";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  coords: Coords = null;
  watchedPlaces: Place[];
  handler: () => void;

  constructor() {
  }

  getLocation(): Promise<Coords> {
    return new Promise<Coords>((resolve, reject) => {
      if (this.coords != null) {
        resolve(this.coords);
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.coords = {lat: position.coords.latitude, lng: position.coords.longitude};
          resolve(this.coords);
        });
      }
    });
  }

  setCustomLocation(coords: Coords) {
    this.coords = coords;

    this.getLocation().then(location => {
      for (const place of this.watchedPlaces) {
        place.distance = coordDistance(place.coordinates, location);
      }
      this.handler();
    });
  }

  setWatchedPlaces(places: Places) {
    this.watchedPlaces = places.places;
  }

  setOnLocationChangeHandler(showResults: () => void) {
    this.handler = showResults;
  }
}
