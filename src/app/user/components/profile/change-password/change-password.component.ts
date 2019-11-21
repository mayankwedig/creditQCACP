import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { RouterService } from '../../../../shared/services/router.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    public localStorageService: LocalStorageService
    , public sessionStorageService: SessionStorageService
    , public routerService: RouterService
    , private errorHandlerService: ErrorHandlerService
    , private userService: UserService) {
  }

  postData: any = { id: 0, old_password: '', new_password: '', confirm_password: '' }
  loginUser: any = {}
  public oldPasswordDataError: String = "";
  public newPasswordDataError: String = "";
  ngOnInit() {
    if (this.localStorageService.userDetails) {
      this.loginUser = this.localStorageService.userDetails;
    } else {
      this.logout()
    }
  }

  logout() {
    this.sessionStorageService.flushOnLogout()
    this.routerService.RedirectHome()
  }

  changePassword() {
    this.removeError();
    this.postData.id = this.loginUser.id
    if (this.postData.new_password != this.postData.confirm_password) {
      //this.errorHandlerService.errorMessage('New password and confirm password not match.');
      this.newPasswordDataError = "New password and confirm password not match."
    } else {
      if(this.postData.new_password.length >= 8) {
        this.userService.changePassword(this.postData).pipe().subscribe((result) => {
          this.errorHandlerService.successMessage('Password changed successfully');
          this.routerService.RedirectProfile()
        }, error => {
          this.oldPasswordDataError = error.error.message;
          //this.errorHandlerService.handleError(error)
        })
      } else {
        this.newPasswordDataError = "Password must be greater than 8 characters"
      }
    }
  }
  removeError() {
    this.oldPasswordDataError = ""
    this.newPasswordDataError = ""
  }
  cancel() {
    this.removeError();
    this.routerService.RedirectProfile()
  }

}
