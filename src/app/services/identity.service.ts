import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private identityBaseUrl = environment.identityBaseUrl;

  private headerOptions = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  public validateLogin(request: any) {
    const url = this.identityBaseUrl + '/account';
    return new Observable(observer => {
      this.http.post(url, request, { headers: this.headerOptions })
        .subscribe((response: any) => {
          observer.next(response);
        });
    });
  }
}
