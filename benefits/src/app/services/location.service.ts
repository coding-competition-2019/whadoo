import {Injectable} from '@angular/core';
import {Coords} from '../entities/places';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  getLocation(): Promise<Coords> {
    return new Promise<Coords>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    });
  }
}
