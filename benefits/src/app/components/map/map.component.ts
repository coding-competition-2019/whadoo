import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormControl} from '@angular/forms';
import {FacilityService} from '../../services/facility.service';
import {Places} from "../../entities/places";
import {getData} from "../../entities/data";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  places: Places;
  activities = new FormControl();
  activityList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private facilityService: FacilityService) {
  }

  ngOnInit() {
    this.places = this.facilityService.getData();
    this.activityList = this.places.places.map((p) => {
      return p.activities;
    }).reduce((previousValue, currentValue) => {
      currentValue.forEach(c => {
        if (previousValue.indexOf(c) < 0) {
          previousValue.push(c);
        }
      });
      return previousValue;
    });
    this.activityList.sort();
  }


  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }
}
