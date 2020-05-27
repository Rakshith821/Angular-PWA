import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WeatherDataService } from '../services/weatherdata.service';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, AfterViewInit {
  weather = {
    city: "Los Angeles",
    conditions: "Sunny",
    temperature: 70,
    icon: ""
  }
  city = "Mumbai";
  VAPID_KEY = "BM-7g_Rr7f26umJzGlIkhix4rxXyC7ELijJgi_oWUKMb95KSSkuegP-S-QeEiAs8k9FLeD0Om63KpShbnezfRJo";
  constructor(private weatherData: WeatherDataService, public swUpdate: SwUpdate, public swPush: SwPush) { }

  ngOnInit(): void {
    this.submit();
    this.reloadCache();
  }

  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(()=>{
        if(confirm('Would you like to update to newer version?')){
          window.location.reload();
        }
      });
    }
  }

  ngAfterViewInit() {
    var d = new Date();
    document.getElementById("day").innerHTML = `${d.getDate()}`;

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    document.getElementById("month").innerHTML = month[d.getMonth()];
  }

  submit() {
    this.weatherData.load(this.city).subscribe(data => {
      this.weather.city = data['name']
      this.weather.conditions = data['weather'][0]['main']
      this.weather.temperature = Math.round((data['main']['temp'] - 273.15))
      this.weather.icon = this.weatherData.getIconUrl(data['weather'][0]['icon']);
    })
  }

  subToNotify() {
    if(this.swUpdate.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_KEY
      }).then(sub => {
        this.weatherData.postSub(sub).subscribe();
      })
    }
  }

}
