import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { resolve } from 'path';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apigatewayBaseUrl = environment.apigatewayBaseUrl;

  private headerOptions = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) {
    this.apigatewayBaseUrl += "/registration/api/v1/registration";
  }

  public getUserTypeList() {
    const url = this.apigatewayBaseUrl + '/getUserTypeLIst';
    console.log(url);
    return new Observable(observer => {
      this.http.post(url, null, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }

  public createNewRegistration(request: any) {
    const url = this.apigatewayBaseUrl + '/insertRegistration';
    return new Observable(observer => {
      this.http.post(url, request, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }


  public getRegistrationById(request: any) {
    const url = this.apigatewayBaseUrl + '/getRegistrationyById';
    return new Observable(observer => {
      this.http.post(url, request, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }
}
