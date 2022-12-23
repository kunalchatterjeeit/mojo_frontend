import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoragekey } from 'app/localStorageKey';
import { CommonService } from 'app/services/common.service';
import { UserMessageType } from 'app/userMessageType';
import { SubscriptionService } from 'app/services/subscription.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public subscriptionList: any[] = [];
  public weatherInfos: any[] = [];

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService, private subscriptionService: SubscriptionService) {
    this.getSubscriptionList();
  }

  ngOnInit() {

  }

  getSubscriptionList() {
    var body = JSON.stringify({
      "registrationId": localStorage.getItem(LocalStoragekey.RegistrationId),
    });
    this.subscriptionService.getAllSubscriptions(body).subscribe({
      next: this.returngetSubscriptionList.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returngetSubscriptionList(response: any): void {
    console.log(response);
    this.subscriptionList = response["data"] as any[];

    if (this.subscriptionList[this.subscriptionList.length - 1]["SelectedCountries"] >= new Date()) {
      var strCountries = this.subscriptionList[this.subscriptionList.length - 1]["SelectedCountries"].replace(/\'/g, '"');

      JSON.parse(strCountries).forEach(country => {
        console.log(country);
        this.getWeatherInformation(country["Name"]);
      })
      console.log(this.weatherInfos);
    }
    else {
      this.commonService.showNotification('top', 'center', "You do not have active subscription. Please purchase subscription to enjoy our service.", UserMessageType.Danger);
    }
  }

  getWeatherInformation(country: string) {
    var body = JSON.stringify({
      "country": country,
    });
    this.subscriptionService.getWeatherInfo(body).subscribe({
      next: this.returnWeatherInfos.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returnWeatherInfos(response: any): void {
    this.weatherInfos.push(response);
  }
  handleError(error: any): void {
    console.log(error);
    this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

}
