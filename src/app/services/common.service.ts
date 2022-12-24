import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStoragekey } from '../localStorageKey';
import { UserMessageType } from '../userMessageType';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  FileId: string = "";

  constructor(private http: HttpClient) { }

  roleMatch(role: string): boolean {
    var isMatch = false;
    var userRolesString = new LocalStorageService().get(LocalStoragekey.UserRole)
    var userRoles: string[] = userRolesString.split(',');
    if (userRoles != null && userRoles.indexOf(role) > -1) {
      isMatch = true;
    }
    return isMatch;
  }

  showNotification(from: any, align: any, message: any, messageType: UserMessageType) {
    debugger;
    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: messageType,
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  getSelectedValues(dropdown: any) {
    var selected = [];
    dropdown.selected.forEach(element => {
      selected.push(element.value)
    });
    return selected;
  }

  isLoggedIn(): boolean {
    var loggedIn = false;
    var userToken = new LocalStorageService().get(LocalStoragekey.UserToken);
    if (userToken != null) {
      loggedIn = true;
    }
    return loggedIn;
  }
}
