import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RegistrationService } from '../services/registration.service';
import {formatDate} from '@angular/common';
import { LocalStoragekey } from 'app/localStorageKey';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  private directBaseUrl: string = environment.directBaseUrl;
  private baseUrl: string = environment.baseUrl;
  public userTypeList: UserType[] = [];


  constructor(private http: HttpClient, private router: Router) {
    this.getUserTypeList();
  }

  ngOnInit(): void {
  }

  getUserTypeList() {
    var headerOptions = { 'Content-Type': 'application/json' };
    this.http.post(this.directBaseUrl + '/registration/getAllRegistrations', null, { headers: headerOptions })
      .subscribe(data => {
        this.returnGetAllFileCategories(data)
      }, err => {
        throw new Error('An error occured: ' + err);
      }
      )
  }
  returnGetAllFileCategories(data: Object): void {
    this.userTypeList = data["data"] as UserType[];
    console.log(this.userTypeList);
  }

  createRegistration(ddlUserType, txtCompanyName, txtYourName, txtEmail, txtMobile, txtAboutMe, txtUserName, txtPassword) {
    console.log(ddlUserType.value);
    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
      "userTypeId": 1,
      "name": txtYourName.value,
      "email": txtEmail.value,
      "phone": txtMobile.value,
      "companyName": txtCompanyName.value,
      "description": txtAboutMe.value,
      "registrationDate": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en'),
      "userName": txtUserName.value,
      "password": txtPassword.value
    });
    this.http.post(this.directBaseUrl + '/registration/insertRegistration', body, { headers: headerOptions })
      .subscribe(data => {
        this.returncreateRegistration(data)
      }, err => {
        throw new Error('An error occured: ' + err);
      });
  }
  returncreateRegistration(data: Object): void {
    console.log(data);
  }

  login(txtLoginUserName,txtLoginPassword) {
    var headerOptions = { 'Content-Type': 'application/json' };
    var body = JSON.stringify({
      "UserName": txtLoginUserName.value,
      "Password": txtLoginPassword.value
    });
    this.http.post(this.baseUrl + '/account', body, { headers: headerOptions })
      .subscribe(data => {
        this.returnLogin(data)
      }, err => {
        throw new Error('An error occured: ' + err);
      });
  }
  returnLogin(data: Object): void {
    debugger;
    if (data) {
      console.log(data["jwtToken"]);
      new LocalStorageService().set(LocalStoragekey.UserToken, data["jwtToken"]);      
      this.router.navigate(['dashboard']);
    }
    else {
      // this.message = data["Message"];
      // this.loginText = "LOGIN";
      // this.loginDisable = false;
    }
  }

}

export interface UserType {
  UserTypeId: number;
  Name: string
}
