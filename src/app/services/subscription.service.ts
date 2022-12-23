import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apigatewayBaseUrl = environment.apigatewayBaseUrl;
  private weatherBaseUrl = environment.apigatewayBaseUrl;

  private headerOptions = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) {
    this.apigatewayBaseUrl += "/subscription/api/v1/subscription";
    this.weatherBaseUrl += '/weather/api/v1/subscription';
  }

  public getAllSubscriptions(request: any) {
    const url = this.apigatewayBaseUrl + '/getAllSubscriptions';
    return new Observable(observer => {
      this.http.post(url, request, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }

  public getWeatherInfo(request: any) {
    const url = this.weatherBaseUrl + '/weatherInfo';
    return new Observable(observer => {
      this.http.post(url, request, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }

  public getPlanList() {
    const url = this.apigatewayBaseUrl + '/getPricingList';
    return new Observable(observer => {
      this.http.get(url)
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }

  public getCountryList() {
    const url = this.apigatewayBaseUrl + '/getCountryList';
    return new Observable(observer => {
      this.http.get(url)
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }

  public insertSubscription(request: any) {
    const url = this.apigatewayBaseUrl + '/insertSubscription';
    return new Observable(observer => {
      this.http.post(url, request, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }
}
