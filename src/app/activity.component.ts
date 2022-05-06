import {Component} from '@angular/core';

@Component({
  selector: 'activity', 
  templateUrl: './activity.component.html',
  styleUrls: [ './activity.component.css' ]
})
export class ActivityComponent {
  positions = [{'latitude': '21.870028', 'longitude': '-102.279372', 'time': '10:28', 'date':'05/05/22'}, {'latitude': '21.850008', 'longitude': '-102.272362', 'time': '07:00', 'date':'04/05/22'}, {'latitude': '21.880328', 'longitude': '-102.272572', 'time': '20:28', 'date':'03/05/22'}, {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27', 'date':'02/05/22'},  {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27', 'date':'05/05/22'}, {'latitude': '21.873028', 'longitude': '-102.254372', 'time': '20:27', 'date':'04/05/22'}];

  filteredPositions = this.positions;

  range = 7;

  displayData = {};

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
      var dateB = new Date(a.date);
      dateB.setDate(dateB.getDate() - range) 
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
      if(this.displayData.hasOwnProperty(this.filteredPositions[i].date)){
        distance = this.displayData[this.filteredPositions[i].date];
      }
      var nextIndex = i + 1;
      if(nextIndex < this.filteredPositions.length){
        if(this.filteredPositions[i].date == this.filteredPositions[nextIndex].date){
          distance += this.calculateDistance(this.filteredPositions[i].latitude, this.filteredPositions[i].longitude, this.filteredPositions[nextIndex].latitude, this.filteredPositions[nextIndex].longitude);
        }
      }
      this.displayData[this.filteredPositions[i].date] = distance;
    }
  }

  constructor(){
    this.filterPositions(this.range);
    this.getDisplayData();
    console.log(JSON.stringify(this.displayData, null, 4));
  }
}