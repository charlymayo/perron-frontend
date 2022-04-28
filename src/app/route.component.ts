import { Component } from '@angular/core';
declare var google: any;

@Component({
  selector: 'route',
  templateUrl: './route.component.html'
})
export class RouteComponent {
  routeUrlBase:string = "https://static-maps.yandex.ru/1.x/?lang=en_US&l=map&pl="; 
  startTime = {hour: 0, minute: 0};
  endTime = {hour: 23, minute: 59};

  getRoute()
  {
    //here you can do work , 
    //this get called when you press "click" button in table 
    alert("holathis.title");

  }

  positions = [{'latitude': '52.228973', 'longitude': '20.728218', 'time': '10:28'}, {'latitude': '53.228973', 'longitude': '20.728218', 'time': '7:00'}, {'latitude': '52.228973', 'longitude': '25.728218', 'time': '20:28'}, {'latitude': '52.228973', 'longitude': '19.728218', 'time': '22:30'}];

  routeImgSrc2 = this.routeUrlBase + this.positions[this.positions.length - 1].latitude + "," + this.positions[this.positions.length - 1].longitude;
  routeImgSrc = "";

}