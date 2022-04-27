import { Component } from '@angular/core';
declare var google: any;

@Component({
  selector: 'location',
  templateUrl: './location.component.html'
})
export class LocationComponent {
  position: {
    latitude: 52.228973,
    longitude: 20.728218
  }
  icon = {
    url: "assets/pawicon.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
}