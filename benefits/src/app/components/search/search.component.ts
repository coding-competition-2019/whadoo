import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Place, Places} from "../../entities/places";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FacilityService} from "../../services/facility.service";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips/typings/chip-input";
import {SearchResult} from "../../entities/search-result";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  allActivities: string[] = [];

  @Output()
  result = new EventEmitter<SearchResult>();

  range = 30;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  activityCtrl = new FormControl();
  filteredActivities: Observable<string[]>;
  activities: string[] = [];

  @ViewChild('activityInput') activityInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private facilityService: FacilityService) {
  }

  ngOnInit() {
    this.filteredActivities = this.activityCtrl.valueChanges.pipe(
      startWith(null),
      map((activity: string | null) => activity ? this._filter(activity) : this.allActivities.slice()));
  }

  showResults() {
    this.result.emit({activities: this.activities, range: this.range});
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value + ' km';
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
