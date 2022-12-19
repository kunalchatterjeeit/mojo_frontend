import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl: string = environment.directBaseUrl;

  constructor(private http: HttpClient) { }

  getUserTypeList() {
    var url = this.baseUrl + '/registration/getAllRegistrations';
    return this.http.post<any>(url, null).pipe(
      map(resp => {
        return resp;
      }, err => {
        throw new Error('An error occured: ' + err);
      }
    ));
  }
}
