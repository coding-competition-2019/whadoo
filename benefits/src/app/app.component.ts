import {Component, OnInit} from '@angular/core';
import {FacilityService} from './services/facility.service';
import {Place, Places, Coords} from './entities/places';
import {coordDistance} from './utilities/distance';
import {LocationService} from "./services/location.service";
import {SearchResult} from "./entities/search-result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  places: Places;
  allActivities: string[] = [];
  results: Place[];
  range = 30;

  currentPosition: Coords = {
    lat: 50.1022711,
    lng: 14.3924335
  };

  constructor(private facilityService: FacilityService, private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.getLocation().then(c => this.currentPosition = c);
    this.places = this.facilityService.getData();
    this.locationService.setWatchedPlaces(this.places);
    this.allActivities = this.places.places.map((p) => {
      return p.activities;
    }).reduce((previousValue, currentValue) => {
      currentValue.forEach(c => {
        if (previousValue.indexOf(c) < 0) {
          previousValue.push(c);
        }
      });
      return previousValue;
    });
    this.allActivities.sort();
  }

  showResults(result: SearchResult) {
    this.results = this.places.places
      .filter(p => {
        return p.distance <= result.range;
      })
      .filter(p => {
        return result.activities.some(activitySelected => {
          return p.activities.includes(activitySelected);
        });
      });
  }
}
