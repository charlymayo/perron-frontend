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
  routeImgSrc:string = "";

  positions = [{'latitude': '21.870028', 'longitude': '-102.279372', 'time': '10:28'}, {'latitude': '21.850008', 'longitude': '-102.272362', 'time': '07:00'}, {'latitude': '21.880328', 'longitude': '-102.272572', 'time': '20:28'}, {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27'}];

  filteredPositions = this.positions;

  getRoute(){
    this.routeImgSrc = this.routeUrlBase;
    for (var position of this.filteredPositions) {
      this.routeImgSrc += position.longitude + "," + position.latitude;
      this.routeImgSrc += ",";
    }
    this.routeImgSrc = this.routeImgSrc.slice(0, -1);
  }

  filterRoute(){
    this.positions.sort(function (a, b) {
      return a.time.localeCompare(b.time);
    });

    var hourStr:string = (this.startTime.hour.toString().length == 1) ? "0" + this.startTime.hour.toString() : this.startTime.hour.toString();
    var minuteStr:string = (this.startTime.minute.toString().length == 1) ? "0" + this.startTime.minute.toString() : this.startTime.minute.toString();
    var startTimeStr:string = hourStr + ":" + minuteStr;

    hourStr = (this.endTime.hour.toString().length == 1) ? "0" + this.endTime.hour.toString() : this.endTime.hour.toString();
    minuteStr = (this.endTime.minute.toString().length == 1) ? "0" + this.endTime.minute.toString() : this.endTime.minute.toString();
    var endTimeStr:string = hourStr + ":" + minuteStr;

    this.filteredPositions = this.positions.filter(function(a){
      return a.time.localeCompare(startTimeStr) > -1 && a.time.localeCompare(endTimeStr) < 1;
    });

    this.getRoute();
  }

  constructor(){
    this.getRoute();
  }
}