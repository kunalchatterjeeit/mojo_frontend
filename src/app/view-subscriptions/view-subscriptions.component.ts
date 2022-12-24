import { Component, OnInit } from '@angular/core';
import { LocalStoragekey } from 'app/localStorageKey';
import { CommonService } from 'app/services/common.service';
import { UserMessageType } from 'app/userMessageType';
import { SubscriptionService } from 'app/services/subscription.service';

@Component({
  selector: 'app-view-subscriptions',
  templateUrl: './view-subscriptions.component.html',
  styleUrls: ['./view-subscriptions.component.scss']
})
export class ViewSubscriptionsComponent implements OnInit {
  public subscriptionList: any[] = [];

  constructor(private commonService: CommonService, private subscriptionService: SubscriptionService) {
    this.getSubscriptionList();
  }

  ngOnInit(): void {
  }

  getSubscriptionList() {
    var body = JSON.stringify({
      "registrationId": localStorage.getItem(LocalStoragekey.RegistrationId),
    });
    this.subscriptionService.getAllSubscriptions(body).subscribe({
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
