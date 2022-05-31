import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var google: any;

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: [ './location.component.css' ]
})
export class LocationComponent {
  constructor(private httpClient: HttpClient) { 
    this.requestCurrentLocation().subscribe(
      res => {
        console.log(res);
      }
  );
  }
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json'})}  
  url = "https://us-central1-iotequipo4tec.cloudfunctions.net/get_last_date-1";

  requestCurrentLocation() {
    return this.httpClient.post('https://us-central1-iotequipo4tec.cloudfunctions.net/get_last_date-1', {}, this.httpHeaders );
  }

  marker_position = {
    lat: 21.8743971,
    lng: -102.2653314
  }
  marker_icon = {
    url: "https://i.ibb.co/NmvgBPB/pawicon.png",
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 16),
  };

  map_options = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    center: { lat: 21.8743971, lng: -102.2653314 },
    disableDefaultUI: true
  };

}