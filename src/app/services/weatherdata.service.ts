import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
let serviceUrl: String = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey: String = '2c313b198213bec84b7d43b397a7bcc3'  // insert your API key here
@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  public notificationURL = "http://localhost:3000/subscribe"
  constructor(private http: HttpClient) { }
  load(city: String) {
    return this.http.get(serviceUrl + '?q=' + city + '&APPID=' + apiKey)
  }
  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png"
  }

  postSub(sub: PushSubscription) {
    return this.http.post(this.notificationURL, sub);
  }
}