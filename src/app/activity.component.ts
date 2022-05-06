import {Component} from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'activity', 
  templateUrl: './activity.component.html',
  styleUrls: [ './activity.component.css' ]
})
export class ActivityComponent {
  width = document.documentElement.clientWidth;
  positions = [{'latitude': '21.870028', 'longitude': '-102.279372', 'time': '10:28', 'date':'05/05/22'}, {'latitude': '21.850008', 'longitude': '-102.272362', 'time': '07:00', 'date':'04/05/22'}, {'latitude': '21.880328', 'longitude': '-102.272572', 'time': '20:28', 'date':'03/05/22'}, {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27', 'date':'02/05/22'},  {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27', 'date':'05/05/22'}, {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27', 'date':'04/05/22'}, {'latitude': '21.871028', 'longitude': '-102.214372', 'time': '20:27', 'date':'05/04/22'},{'latitude': '21.871048', 'longitude': '-102.214572', 'time': '15:22', 'date':'05/03/22'}, {'latitude': '21.871044', 'longitude': '-102.211572', 'time': '10:22', 'date':'05/03/22'},
  {'latitude': '21.874048', 'longitude': '-102.224572', 'time': '15:22', 'date':'05/02/22'},
  {'latitude': '21.874038', 'longitude': '-102.222572', 'time': '08:22', 'date':'05/02/22'},
  {'latitude': '21.874048', 'longitude': '-102.224572', 'time': '15:22', 'date':'05/01/22'},
  {'latitude': '21.874738', 'longitude': '-102.202572', 'time': '08:22', 'date':'05/01/22'},
  {'latitude': '21.874048', 'longitude': '-102.224572', 'time': '15:22', 'date':'04/30/22'},
  {'latitude': '21.874048', 'longitude': '-102.204572', 'time': '15:22', 'date':'04/30/22'},
  {'latitude': '21.872048', 'longitude': '-102.244572', 'time': '15:22', 'date':'04/29/22'},
  {'latitude': '21.874738', 'longitude': '-102.232572', 'time': '08:22', 'date':'04/29/22'},
  {'latitude': '21.872048', 'longitude': '-102.244572', 'time': '15:22', 'date':'04/28/22'},
  {'latitude': '21.874738', 'longitude': '-102.232572', 'time': '08:22', 'date':'04/28/22'},
  {'latitude': '21.832048', 'longitude': '-102.243572', 'time': '15:22', 'date':'04/27/22'},
  {'latitude': '21.844738', 'longitude': '-102.234572', 'time': '08:22', 'date':'04/27/22'},
  {'latitude': '21.830048', 'longitude': '-102.241572', 'time': '15:22', 'date':'04/26/22'},
  {'latitude': '21.841738', 'longitude': '-102.231572', 'time': '08:22', 'date':'04/26/22'},
  {'latitude': '21.830048', 'longitude': '-102.241572', 'time': '15:22', 'date':'04/25/22'},
  {'latitude': '21.841798', 'longitude': '-102.231512', 'time': '08:22', 'date':'04/25/22'},
  {'latitude': '21.830048', 'longitude': '-102.241172', 'time': '15:22', 'date':'04/24/22'},
  {'latitude': '21.846798', 'longitude': '-102.231512', 'time': '08:22', 'date':'04/24/22'},
  {'latitude': '21.830048', 'longitude': '-102.249172', 'time': '15:22', 'date':'04/23/22'},
  {'latitude': '21.846098', 'longitude': '-102.231512', 'time': '08:22', 'date':'04/23/22'}, {'latitude': '21.846098', 'longitude': '-102.231512', 'time': '08:22', 'date':'05/04/22'}, {'latitude': '21.846098', 'longitude': '-102.231512', 'time': '08:22', 'date':'05/06/22'}, {'latitude': '21.846118', 'longitude': '-102.221512', 'time': '08:12', 'date':'05/06/22'}];
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

  constructor(){
    this.displayData(this.range);
  }
}