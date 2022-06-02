import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Subscription, timer} from 'rxjs';  
import { switchMap } from 'rxjs/operators';
declare var google: any;

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: [ './location.component.css' ]
})
export class LocationComponent implements OnDestroy {
  subscription !: Subscription;
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json'})}  
  url = "https://us-central1-iotequipo4tec.cloudfunctions.net/get_last_date-2";

  constructor(private httpClient: HttpClient) { 
    this.subscription = timer(0, 5000000).pipe(
      switchMap(() => this.requestCurrentPosition())
    ).subscribe(result => {
      this.marker_position = {
        lat: parseFloat(result["positions"][0].latitude),
        lng: parseFloat(result["positions"][0].longitude)
      }
      this.map_options = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        center: { lat: parseFloat(result["positions"][0].latitude), lng: parseFloat(result["positions"][0].longitude) },
        disableDefaultUI: true
      };
    });
  }

  requestCurrentPosition() {
    return this.httpClient.post(this.url, {}, this.httpHeaders ).pipe(
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}