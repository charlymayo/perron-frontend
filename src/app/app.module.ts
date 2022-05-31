import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from "@angular/google-maps";
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './navbar.component';
import { ActivityComponent } from './activity.component';
import { LocationComponent } from './location.component';
import { RouteComponent } from './route.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, NgbModule, GoogleMapsModule, GoogleChartsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, NavbarComponent, ActivityComponent, LocationComponent, RouteComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
