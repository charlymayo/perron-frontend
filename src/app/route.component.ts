import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Component({
  selector: 'route',
  templateUrl: './route.component.html',
  styleUrls: [ './route.component.css' ]
})
export class RouteComponent{
  routeUrlBase:string = "https://static-maps.yandex.ru/1.x/?lang=en_US&l=map&pl="; 
  startTime = {hour: 0, minute: 0};
  endTime = {hour: 23, minute: 59};
  startDate = "";
  endDate = "";
  routeImgSrc:string = "";
  todayDate = new Date();
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json'})}  
  url = "https://us-central1-iotequipo4tec.cloudfunctions.net/get_last_date-2";
  positions = [{'latitude': '21.870028', 'longitude': '-102.279372', 'time': '10:28'}];
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

  constructor(private httpClient: HttpClient) { 
    this.requestTodaysPositions().subscribe(result => {
      this.positions = result["positions"];
      this.getRoute();
    });
    
  }

  requestTodaysPositions() {
    var yearStr = this.todayDate.getFullYear();
    var monthStr:string = (this.todayDate.getMonth().toString().length == 1) ? "0" + (this.todayDate.getMonth() + 1).toString() : (this.todayDate.getMonth() + 1).toString();
    var dayStr:string = (this.todayDate.getDate().toString().length == 1) ? "0" + this.todayDate.getDate().toString() : this.todayDate.getDate().toString(); 
    this.startDate = yearStr + "-" + monthStr + "-" + dayStr + " 00:00:00";
    this.endDate = yearStr + "-" + monthStr + "-" + dayStr + " 23:59:59";
    return this.httpClient.post(this.url, {"start_date": this.startDate, "end_date": this.endDate}, this.httpHeaders ).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}