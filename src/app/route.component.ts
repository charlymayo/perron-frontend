import { Component } from '@angular/core';
declare var google: any;

@Component({
  selector: 'route',
  templateUrl: './route.component.html',
  styleUrls: [ './route.component.css' ]
})
export class RouteComponent {
  routeUrlBase:string = "https://static-maps.yandex.ru/1.x/?lang=en_US&l=map&pl="; 
  startTime = {hour: 0, minute: 0};
  endTime = {hour: 23, minute: 59};

  getRoute()
  {

  }

  positions = [{'latitude': '21.870028', 'longitude': '-102.279372', 'time': '10:28'}, {'latitude': '21.850008', 'longitude': '-102.272362', 'time': '7:00'}, {'latitude': '21.880328', 'longitude': '-102.272572', 'time': '20:28'}, {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '22:30'}];

  routeImgSrc = "";
  constructor(){
    if(this.routeImgSrc === ""){
      this.routeImgSrc = this.routeUrlBase;
    }
    for (var position of this.positions) {
      this.routeImgSrc += position.longitude + "," + position.latitude;
      this.routeImgSrc += ",";
    }
    this.routeImgSrc = this.routeImgSrc.slice(0, -1);
  }
}