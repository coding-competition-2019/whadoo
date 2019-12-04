import {Component, OnInit} from '@angular/core';
import {FacilityService} from '../../services/facility.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private facilityService: FacilityService) {
  }

  ngOnInit() {
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }
}
