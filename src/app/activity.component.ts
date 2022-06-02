import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'activity', 
  templateUrl: './activity.component.html',
  styleUrls: [ './activity.component.css' ]
})
export class ActivityComponent{
  width = document.documentElement.clientWidth;
  positions = [{'latitude': '21.870028', 'longitude': '-102.279372', 'time': '10:28', 'date':'05/05/22'}];
  filteredPositions = this.positions;
  range:Number = 7;
  dataObj = {};
  dataArr = [];
  chart_type = ChartType.ColumnChart;
  chart_options = {
    width: this.width,
    colors: ['#5cb85c'],
    legend: { position: 'none' }
  };
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json'})}  
  url = "https://us-central1-iotequipo4tec.cloudfunctions.net/get_last_date-2";

  filterPositions(range){
    this.positions.sort(function (a, b) {
      var dateA = new Date(a.date + " " + a.time);
      var dateB = new Date(b.date + " " + b.time);
      if(dateA>dateB){
        return 1;
      }else{
        return -1;
      }
    });

    this.filteredPositions = this.positions.filter(function(a){
      var dateA = new Date(a.date);
      var dateB = new Date();
      dateB.setDate(dateB.getDate() - range);
      return dateA > dateB;
    });
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); 
  }

  getDisplayData(){
    for (var i = 0; i < this.filteredPositions.length; i++) {
      var distance = 0;
      if(this.dataObj.hasOwnProperty(this.filteredPositions[i].date)){
        distance = this.dataObj[this.filteredPositions[i].date];
      }
      var nextIndex = i + 1;
      if(nextIndex < this.filteredPositions.length){
        if(this.filteredPositions[i].date == this.filteredPositions[nextIndex].date){
          distance += this.calculateDistance(this.filteredPositions[i].latitude, this.filteredPositions[i].longitude, this.filteredPositions[nextIndex].latitude, this.filteredPositions[nextIndex].longitude);
        }
      }
      this.dataObj[this.filteredPositions[i].date] = distance;
    }
    this.dataArr = Object.keys(this.dataObj).map((key) => {
      return [key, Number(this.dataObj[key])];
    });
  }

  displayData(range){
    this.dataObj = {};
    this.dataArr = [];
    this.filterPositions(range);
    this.getDisplayData();
  }

  resetWindowSize(event){
    this.width = event.target.innerWidth;
    this.displayData(this.range);
    this.chart_options = {
      width: this.width,
      colors: ['#5cb85c'],
      legend: { position: 'none' }
    };
  }

  requestPositions() {
    var dateA = new Date();
    var dateB = new Date();
    dateA.setDate(dateB.getDate() - 30);
    var yearStr = dateA.getFullYear();
    var monthStr:string = (dateA.getMonth().toString().length == 1) ? "0" + (dateA.getMonth() + 1).toString() : (dateA.getMonth() + 1).toString();
    var dayStr:string = (dateA.getDate().toString().length == 1) ? "0" + dateA.getDate().toString() : dateA.getDate().toString(); 
    var startDate = yearStr + "-" + monthStr + "-" + dayStr + " 00:00:00";

    var yearStr = dateB.getFullYear();
    var monthStr:string = (dateB.getMonth().toString().length == 1) ? "0" + (dateB.getMonth() + 1).toString() : (dateB.getMonth() + 1).toString();
    var dayStr:string = (dateB.getDate().toString().length == 1) ? "0" + dateB.getDate().toString() : dateB.getDate().toString(); 
    var endDate = yearStr + "-" + monthStr + "-" + dayStr + " 23:59:59";
    return this.httpClient.post(this.url, {"start_date": startDate, "end_date": endDate}, this.httpHeaders ).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  constructor(private httpClient: HttpClient) { 
    this.requestPositions().subscribe(result => {
      this.positions = result["positions"];
      this.displayData(this.range);
    });
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