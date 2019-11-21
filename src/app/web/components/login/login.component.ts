import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../user/services/user.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { RouterService } from '../../../shared/services/router.service';
import { UserStatus, PopupType } from '../../../shared/constants/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDetails = { password: '', email: '' };
  public errorMessage: string;

  constructor(private modalService: NgbModal,
    private commonService: CommonService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private routerService: RouterService
  ) { }

  ngOnInit() {
  }

  //Open forgot password Popup
  openForgotPassword() {
    this.commonService.closePopup()
    this.routerService.RedirectToPopup(PopupType.ForgotPassword);
  }

  //Open Register
  openRegistration() {
    
    this.commonService.closePopup()
    this.routerService.RedirectToPopup(PopupType.SigUp);
  }

  closePopup() {
    this.commonService.closePopup()
    this.routerService.RedirectHome();
  }

  public authenticate() {
    this.errorMessage = '';
    this.userService.login(this.loginDetails).pipe().subscribe((result) => {
      if (result != null) {
        if (result.body.status == UserStatus.active) {
          this.sessionStorageService.setUserAuthDetails(result.body);
          this.sessionStorageService.setUserDetails(result.body);
          this.closePopup()
          this.routerService.RedirectDashboard()
        } else {
          this.sessionStorageService.setUserRegistration(result.body);
          this.openRegistration()
        }
      } else {
        this.errorMessage = 'Something went wrong. Please try after sometime.';
      }
    }, error => {
      if (error.error.message != null && error.error.message != '') {
        this.errorMessage = error.error.message;
      }
      else {
        this.errorMessage = 'Something went wrong. Please try after sometime.';
      }
    }
    );
  }

}
