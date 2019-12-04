import {Injectable} from '@angular/core';
import {Coords} from '../entities/places';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  coords: Coords = null;

  constructor() {
  }

  getLocation(): Promise<Coords> {
    return new Promise<Coords>((resolve, reject) => {
      if (this.coords != null) {
        resolve(this.coords);
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          resolve({lat: position.coords.latitude, lng: position.coords.longitude});
        });
      }
    });
  }

  setCustomLocation(coords: Coords) {
    this.coords = coords;
  }
}
