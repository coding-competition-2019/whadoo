import {Component, OnInit, OnChanges, AfterViewInit, ViewChild, ElementRef, Input, SimpleChanges} from '@angular/core';
import {FacilityService} from '../../services/facility.service';
import {} from 'googlemaps';
import {Place} from '../../entities/places';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  results: Place[] = [];

  @ViewChild('mapContainer', {read: false}) gmap: ElementRef;

  map: google.maps.Map;
  // Coordinates for Prague
  lat = 50.0755381;
  lng = 14.4378005;

  zoomLevel = 10;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: this.zoomLevel,
  };

  markers = [];

  setMarker() {

  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
  }

  constructor(private facilityService: FacilityService) {
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.results);
    if (changes.results && changes.results.currentValue) {
      for (const marker of this.markers){
        marker.setMap(null);
      }
      this.markers = [];
      for (const place of changes.results.currentValue) {
        const newMarker = new google.maps.Marker({
          position: new google.maps.LatLng(place.coordinates.lat, place.coordinates.lng)
        });
        this.markers.push(newMarker);
        newMarker.setMap(this.map);
      }
    }
    // for (i = 0; i < markers.length; i++) {
    //  markers[i].setMap(null);
    // }


  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);

    });
  }
}
