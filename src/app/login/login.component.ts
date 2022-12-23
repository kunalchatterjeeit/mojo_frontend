import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { formatDate } from '@angular/common';
import { LocalStoragekey } from 'app/localStorageKey';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Router } from '@angular/router';
import { UserMessageType } from 'app/userMessageType';
import { RegistrationService } from 'app/services/registration.service';
import { IdentityService } from 'app/services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public userTypeList: UserType[] = [];
  public ddlFileCategoryStatus: string = "Loading...";

  constructor(private router: Router, private commonService: CommonService, private registrationService: RegistrationService, private identityService: IdentityService) {
    this.getUserTypeList();
  }

  ngOnInit(): void {
  }

  getUserTypeList() {
    this.registrationService.getUserTypeList().subscribe({
      next: this.returnGetAllFileCategories.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returnGetAllFileCategories(response: Object): void {
    this.ddlFileCategoryStatus = "User Type";
    this.userTypeList = response["data"] as UserType[];
    console.log(response);
  }
  handleError(error: any): void {
    this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

  createRegistration(ddlUserType, txtCompanyName, txtYourName, txtEmail, txtMobile, txtAboutMe, txtUserName, txtPassword) {
    var body = this.createRequestBody(ddlUserType, txtCompanyName, txtYourName, txtEmail, txtMobile, txtAboutMe, txtUserName, txtPassword);
      this.registrationService.createNewRegistration(body).subscribe({
        next: this.returncreateRegistration.bind(this),
        error: this.handleError.bind(this)
      });
  }
  returncreateRegistration(response: Object): void {
    console.log(response["data"]);
    this.commonService.showNotification('top', 'center', "Registration success. Please login.", UserMessageType.Success);
  }

  login(txtLoginUserName, txtLoginPassword) {
    var body = JSON.stringify({
      "UserName": txtLoginUserName.value,
      "Password": txtLoginPassword.value
    });
    this.identityService.validateLogin(body).subscribe({
      next: this.returnLogin.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returnLogin(response: Object): void {
    if (response["data"]) {
      console.log(response["data"]["jwtToken"]);
      new LocalStorageService().set(LocalStoragekey.UserToken, response["data"]["jwtToken"]);
      new LocalStorageService().set(LocalStoragekey.RegistrationId, response["data"]["registrationId"]);
      this.router.navigate(['dashboard']);
    }
    else {

    }
  }
  createRequestBody(ddlUserType, txtCompanyName, txtYourName, txtEmail, txtMobile, txtAboutMe, txtUserName, txtPassword) {
    return JSON.stringify({
      "userTypeId": ddlUserType.value,
      "name": txtYourName.value,
      "email": txtEmail.value,
      "phone": txtMobile.value,
      "companyName": txtCompanyName.value,
      "description": txtAboutMe.value,
      "registrationDate": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en'),
      "userName": txtUserName.value,
      "password": txtPassword.value
    });
  }
}

export interface UserType {
  UserTypeId: number;
  Name: string
}


