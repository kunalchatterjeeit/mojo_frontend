import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoragekey } from 'app/localStorageKey';
import { Country } from 'app/models/country';
import { CommonService } from 'app/services/common.service';
import { UserMessageType } from 'app/userMessageType';
import * as Chartist from 'chartist';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private directBaseUrl: string = environment.directBaseUrl;
  private identityBaseUrl: string = environment.identityBaseUrl;
  private apigatewayBaseUrl: string = environment.apigatewayBaseUrl;
  public subscriptionList: any[] = [];
  public weatherInfos: any[]=[];

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService) { 
    this.getSubscriptionList();
  }

  ngOnInit() {

  }

  getSubscriptionList() {
    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
      "registrationId": localStorage.getItem(LocalStoragekey.RegistrationId),
    });
    this.http.post(this.apigatewayBaseUrl + '/subscription/api/v1/subscription/getAllSubscriptions', body, { headers: headerOptions })
      .subscribe({
        next: this.returngetSubscriptionList.bind(this),
        error: this.handleError.bind(this)
      });
  }
  returngetSubscriptionList(response: any): void {
    console.log(response);
    this.subscriptionList = response["data"] as any[];
    var strCountries = this.subscriptionList[this.subscriptionList.length-1]["SelectedCountries"].replace(/\'/g,'"');
   
    JSON.parse(strCountries).forEach(country=>{
      console.log(country);
      this.getWeatherInformation(country["Name"]);
    })
    console.log(this.weatherInfos);
  }

  getWeatherInformation(country: string) {
    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
      "country": country,
    });
    this.http.post(this.apigatewayBaseUrl + '/weather/api/v1/subscription/weatherInfo', body, { headers: headerOptions })
      .subscribe({
        next: this.returnWeatherInfos.bind(this),
        error: this.handleError.bind(this)
      });
  }
  returnWeatherInfos(response:any):void{
    this.weatherInfos.push(response);
  }
  handleError(error: any): void {
    console.log(error);
    this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

}
