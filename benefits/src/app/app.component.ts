import {Component, OnInit} from '@angular/core';
import {FacilityService} from './services/facility.service';
import {Place, Places, Coordinates} from './entities/places';
import {coordDistance} from './utilities/distance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  places: Places;
  allActivities: string[] = [];
  results: Place[];
  currentPosition: Coordinates = {
    lat: 50.1022711,
    lng: 14.3924335
  };

  constructor(private facilityService: FacilityService) {
  }

  ngOnInit() {
    this.places = this.facilityService.getData();
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

  showResults(activities) {
    this.results = this.places.places.filter(p => {
      return activities.some(activitySelected => {
        return p.activities.includes(activitySelected);
      });
    });

    this.results.forEach(r => {
      r.distance = coordDistance(r.coordinates, this.currentPosition);
    });
  }
}
