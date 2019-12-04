import {Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {FacilityService} from '../../services/facility.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {

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

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);

    });
  }
}
