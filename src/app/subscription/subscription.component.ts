import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { formatDate } from '@angular/common';
import { LocalStoragekey } from 'app/localStorageKey';
import { CommonService } from 'app/services/common.service';
import { UserMessageType } from 'app/userMessageType';
import { Country } from 'app/models/country';
import { SubscriptionService } from 'app/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  public planList: any[] = [];
  public pricingList: any[] = [];
  public ddlFileCategoryStatus: string = "Loading...";
  public timeList = [
    { "Slot": "12AM" },
    { "Slot": "4AM" },
    { "Slot": "8AM" },
    { "Slot": "12PM" },
    { "Slot": "4PM" },
    { "Slot": "8PM" },
  ]
  public price: any = "";
  public currency: any = "";
  public companyName: any = "";
  public name: any = "";
  public email: any = "";
  public phone: any = "";
  public countryList: Country[] = [];
  public days: any;


  constructor(private commonService: CommonService, private subscriptionService: SubscriptionService, private registrationService: RegistrationService) {
    this.getPlanList();
    this.getCountryList();
    this.getRegistrationById(localStorage.getItem(LocalStoragekey.RegistrationId));
  }

  ngOnInit(): void {
  }

  getPlanList() {
    this.subscriptionService.getPlanList().subscribe({
      next: this.returnGetAllFileCategories.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returnGetAllFileCategories(response: any): void {
    console.log(response);
    this.ddlFileCategoryStatus = "Plan";
    this.planList = response["data"] as any[];
  }

  getCountryList() {
    this.subscriptionService.getCountryList().subscribe({
      next: this.returngetCountryList.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returngetCountryList(response: any): void {
    console.log(response);
    this.countryList = response["data"] as Country[];
    console.log(this.countryList);

  }

  getRegistrationById(id: any) {
    var body = JSON.stringify({
      "registrationId": id,
    });
    this.registrationService.getRegistrationById(body).subscribe({
      next: this.returngetRegistrationById.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returngetRegistrationById(response: any): void {
    console.log(response);
    this.companyName = response["data"][0]["CompanyName"];
    this.name = response["data"][0]["Name"];
    this.email = response["data"][0]["Email"];
    this.phone = response["data"][0]["Phone"];
  }

  insertSubscription(ddlPlan, name, email, phone, companyName, billingDetails) {
    if (this.countryList.filter(p => p.checked).toString() == "") {
      this.commonService.showNotification('top', 'center', "Please select country.", UserMessageType.Danger);
      return;
    }
    var body = this.createSubscriptionBody(ddlPlan, name, email, phone, companyName, billingDetails)
    this.subscriptionService.insertSubscription(body).subscribe({
      next: this.returninsertSubscription.bind(this),
      error: this.handleError.bind(this)
    });
  }
  createSubscriptionBody(ddlPlan: any, name: any, email: any, phone: any, companyName: any, billingDetails: any) {
    var date = new Date();
    date.setDate(date.getDate() + this.days);

    JSON.stringify({
      "planId": ddlPlan.value,
      "registrationId": localStorage.getItem(LocalStoragekey.RegistrationId),
      "name": name.value,
      "email": email.value,
      "phone": phone.value,
      "companyName": companyName.value,
      "billingDetails": billingDetails.value,
      "subscriptionStartDate": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en'),
      "subscriptionEndDate": formatDate(date, 'yyyy-MM-dd hh:mm:ss', 'en'),
      "purchaseDate": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en'),
      "subscriptionStatusId": 1,
      "selectedCountries": JSON.stringify(this.countryList.filter(p => p.checked)).replace(/"/g, '\'')
    });
  }
  returninsertSubscription(response: any): void {
    console.log(response);
    this.commonService.showNotification('top', 'center', "Subscribed", UserMessageType.Success);

  }
  handleError(error: any): void {
    this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

  planOnChange(planId) {
    debugger;
    this.price = this.planList.filter(p => p["PlanId"] == planId)[0]["Price"];
    this.currency = this.planList.filter(p => p["PlanId"] == planId)[0]["Currancy"];
    this.days = this.planList.filter(p => p["PlanId"] == planId)[0]["Days"];
    console.log(this.planList, this.price, this.currency);
  }

  countrySelectionChange(event, countrySpan, ddlCountry) {
    debugger;
    console.log(event, countrySpan, ddlCountry);
    console.log(this.countryList);
  }
}
