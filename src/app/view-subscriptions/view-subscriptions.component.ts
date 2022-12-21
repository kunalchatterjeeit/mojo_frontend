import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoragekey } from 'app/localStorageKey';
import { CommonService } from 'app/services/common.service';
import { UserMessageType } from 'app/userMessageType';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-subscriptions',
  templateUrl: './view-subscriptions.component.html',
  styleUrls: ['./view-subscriptions.component.scss']
})
export class ViewSubscriptionsComponent implements OnInit {
  private directBaseUrl: string = environment.directBaseUrl;
  private identityBaseUrl: string = environment.identityBaseUrl;
  private apigatewayBaseUrl: string = environment.apigatewayBaseUrl;
  public subscriptionList: any[] = [];

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService) {
    this.getSubscriptionList();
  }

  ngOnInit(): void {
  }

  getSubscriptionList() {
    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
      "registrationId": localStorage.getItem(LocalStoragekey.RegistrationId),
    });
    this.http.post(this.apigatewayBaseUrl + '/subscription/api/v1/subscription/getAllSubscriptions', body, { headers: headerOptions })
      .subscribe({
        next: this.returnGetAllFileCategories.bind(this),
        error: this.handleError.bind(this)
      });
  }
  returnGetAllFileCategories(response: any): void {
    console.log(response);
    this.subscriptionList = response["data"] as any[];

  }
  handleError(error: any): void {
    this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

}
