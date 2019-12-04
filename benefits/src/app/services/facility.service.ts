import {Injectable, OnInit} from '@angular/core';
import {Places} from "../entities/places";
import {loadData} from "../entities/data";

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor() {
  }

  // TODO load from database
  // TODO add server-side filtering and pagination
  getData(): Places {
    const data: Places = loadData();
    data.places.forEach((value, index) => {
      value.id = index + 1;
    });
    return data;
  }
}
