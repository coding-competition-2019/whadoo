import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FacilityService} from '../../services/facility.service';
import {Place, Places} from '../../entities/places';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips/typings/chip-input';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  places: Places;
  results: Place[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  activityCtrl = new FormControl();
  filteredActivities: Observable<string[]>;
  activities: string[] = [];
  allActivities: string[];

  @ViewChild('activityInput', {static: false}) activityInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private facilityService: FacilityService) {
    this.filteredActivities = this.activityCtrl.valueChanges.pipe(
      startWith(null),
      map((activity: string | null) => activity ? this._filter(activity) : this.allActivities.slice()));
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

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }

  showResults() {
    this.results = this.places.places.filter(p => {
      return this.activities.some(activitySelected => {
        return p.activities.includes(activitySelected);
      });
    });
    console.log(this.results);
  }

  add(event: MatChipInputEvent): void {
    // Add activity only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our activity
      if ((value || '').trim()) {
        this.activities.push(value.trim());
        this.showResults();
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.activityCtrl.setValue(null);
    }
  }

  remove(activity: string): void {
    const index = this.activities.indexOf(activity);

    if (index >= 0) {
      this.activities.splice(index, 1);
      this.showResults();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.activities.push(event.option.viewValue);
    this.activityInput.nativeElement.value = '';
    this.activityCtrl.setValue(null);
    this.showResults();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActivities.filter(activity => activity.toLowerCase().indexOf(filterValue) === 0);
  }
}
