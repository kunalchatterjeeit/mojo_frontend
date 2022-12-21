import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonService } from '../services/common.service';
import { formatDate } from '@angular/common';
import { LocalStoragekey } from 'app/localStorageKey';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Router } from '@angular/router';
import { UserMessageType } from 'app/userMessageType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  private directBaseUrl: string = environment.directBaseUrl;
  private identityBaseUrl: string = environment.identityBaseUrl;
  private apigatewayBaseUrl: string = environment.apigatewayBaseUrl;
  public userTypeList: UserType[] = [];
  public ddlFileCategoryStatus: string = "Loading...";


  constructor(private http: HttpClient, private router: Router,private commonService: CommonService) {
    this.getUserTypeList();
  }

  ngOnInit(): void {
  }

  getUserTypeList() {
    var headerOptions = { 'Content-Type': 'application/json' };
    this.http.post(this.apigatewayBaseUrl + '/registration/api/v1/registration/getUserTypeLIst', null, { headers: headerOptions })
      .subscribe(data => {
        this.returnGetAllFileCategories(data)
      }, err => {
        throw new Error('An error occured: ' + err);
      });
  }
  returnGetAllFileCategories(data: Object): void {
    this.ddlFileCategoryStatus = "User Type";
    this.userTypeList = data["data"] as UserType[];
    console.log(this.userTypeList);
  }

  createRegistration(ddlUserType, txtCompanyName, txtYourName, txtEmail, txtMobile, txtAboutMe, txtUserName, txtPassword) {

    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
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
    this.http.post(this.apigatewayBaseUrl + '/registration/api/v1/registration/insertRegistration', body, { headers: headerOptions })
      .subscribe(data => {
        this.returncreateRegistration(data)
      }, err => {
        this.commonService.showNotification('top', 'center', err, UserMessageType.Danger);
      });
  }
  returncreateRegistration(data: Object): void {
    console.log(data);    
    this.commonService.showNotification('top', 'center', "Registration success. Please login.", UserMessageType.Success);
  }

  login(txtLoginUserName, txtLoginPassword) {
    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
      "UserName": txtLoginUserName.value,
      "Password": txtLoginPassword.value
    });
    this.http.post(this.identityBaseUrl + '/account', body, { headers: headerOptions })
      .subscribe(data => {
        this.returnLogin(data)
      }, err => {
        this.commonService.showNotification('top', 'center', "Invalid login credential.", UserMessageType.Danger);
      });
  }
  returnLogin(data: Object): void {
    debugger;
    if (data) {
      console.log(data["jwtToken"]);
      new LocalStorageService().set(LocalStoragekey.UserToken, data["jwtToken"]);
      new LocalStorageService().set(LocalStoragekey.RegistrationId, data["registrationId"]);
      this.router.navigate(['dashboard']);
    }
    else {
      
    }
  }

}

export interface UserType {
  UserTypeId: number;
  Name: string
}
