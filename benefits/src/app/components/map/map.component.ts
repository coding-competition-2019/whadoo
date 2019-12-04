import {Component, OnInit, OnChanges, AfterViewInit, ViewChild, ElementRef, Input, SimpleChanges} from '@angular/core';
import {FacilityService} from '../../services/facility.service';
import {} from 'googlemaps';
import {Place, Places} from '../../entities/places';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  allPlaces: Places;

  @Input()
  results: Place[] = [];

  @ViewChild('mapContainer', {read: false}) gmap: ElementRef;

  map: google.maps.Map;
  // Coords for Prague
  lat = 50.0755381;
  lng = 14.4378005;

  zoomLevel = 10;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: this.zoomLevel,
  };

  markers = [];
  bounds = null;

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
  }

  constructor(private facilityService: FacilityService) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.mapInitializer();
    // console.log(this.allPlaces.places);

    // Creates var for new bounds
    this.bounds = new google.maps.LatLngBounds();

    for (const place of this.allPlaces.places) {
      const newMarker = new google.maps.Marker({
        position: new google.maps.LatLng(place.coordinates.lat, place.coordinates.lng),
        title: place.name
      });
      this.markers.push(newMarker);
      newMarker.setMap(this.map);

      this.bounds.extend(newMarker.getPosition());
    }

    // Resize map to fit all markers
    this.map.fitBounds(this.bounds);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];

    if (changes.results && changes.results.currentValue) {
      if (changes.results.currentValue.length > 0) {
        // Creates var for new bounds
        this.bounds = new google.maps.LatLngBounds();

        for (const place of changes.results.currentValue) {
          const newMarker = new google.maps.Marker({
            position: new google.maps.LatLng(place.coordinates.lat, place.coordinates.lng),
            title: place.name
          });
          this.markers.push(newMarker);

          // Add bounds to map
          this.bounds.extend(newMarker.getPosition());
          newMarker.setMap(this.map);
        }

        // Resize map to fit all markers
        this.map.fitBounds(this.bounds);

      } else {
        this.ngOnInit();
      }
      // for (i = 0; i < markers.length; i++) {
      //  markers[i].setMap(null);
      // }
    }


  }
}
