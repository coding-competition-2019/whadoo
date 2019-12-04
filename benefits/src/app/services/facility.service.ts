import {Injectable, OnInit} from '@angular/core';
import {Places} from "../entities/places";
import {loadData} from "../entities/data";

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor() {
  }

  getData(): Places {
    return loadData();
  }
}
