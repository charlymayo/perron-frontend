import { Component } from '@angular/core';
declare var google: any;

@Component({
  selector: 'location',
  templateUrl: './location.component.html'
})
export class LocationComponent {
  marker_position: {
    latitude: 52.228973,
    longitude: 20.728218
  }
  marker_icon = {
    url: "https://i.ibb.co/NmvgBPB/pawicon.png",
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 16),
  };

map_options = {
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  streetViewControl: false,
  disableDefaultUI: true
};

}