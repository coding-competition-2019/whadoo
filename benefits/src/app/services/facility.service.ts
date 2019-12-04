import {Injectable, OnInit} from '@angular/core';
import {Coords, Places} from '../entities/places';
import {loadData} from '../entities/data';
import {coordDistance} from '../utilities/distance';
import {LocationService} from './location.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private locationService: LocationService) {
    this.locationService = locationService;
  }

  // TODO load from database
  // TODO add server-side filtering and pagination
  getData(): Places {
    const data: Places = loadData();

    this.locationService.getLocation().then(coords => {
      data.places.forEach((value, index) => {
        value.id = index + 1;
        value.distance = coordDistance(coords, value.coordinates);
      });
    });

    return data;
  }
}
