import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { PopupType } from '../../../shared/constants/enum';
import { UserService } from '../../../user/services/user.service';
import { RouterService } from '../../../shared/services/router.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  //
  constructor(private commonService: CommonService
    , private routerService: RouterService
    , private errorHandlerService: ErrorHandlerService
    , private userService: UserService) { }

  postData: any = {}
  errorMsg: string = ""
  errorOtpMsg: string = ""
  errorRPMsg: string = ""
  successOTPMsg: string = ""
  emailVerified: boolean = false;
  otpVerified: boolean = false;
  userData: any = {}

  ngOnInit() {
  }

  //Open Login Popup
  openLogin() {
    this.commonService.closePopup()
    this.routerService.RedirectToPopup(PopupType.Login);
  }

  closePopup() {
    this.commonService.closePopup()
  }

  save(isReset: boolean = false) {
    this.userService.sendOTP(this.postData).pipe().subscribe((result) => {
      this.emailVerified = true;
      this.otpVerified = false;
      if (isReset) {
        this.successOTPMsg = 'OTP successfully resend.'
      }
      this.userData = result.body.resData;
    }, error => {
      this.errorMsg = error.error.message;
    }
    );
  }

  verifiedOTP() {
    //this.postData.mobile = this.userData.mobile;
    this.postData.customer_id = this.userData.customer_id;
    this.userService.verifyOTP(this.postData).pipe().subscribe((result) => {
      
      this.otpVerified = true;
      this.userData = result.body;
    }, error => {
      this.errorOtpMsg = error.error.message;
    }
    );
  }

  resetPassword() {
    if (this.postData.password == this.postData.confirm_password) {
      if(this.postData.password.length >= 8) {
        this.postData.id = this.userData.customer_id;
        this.userService.resetPassword(this.postData).pipe().subscribe((result) => {
          this.errorHandlerService.successMessage('Password successfully reset.')
          this.openLogin()
        }, error => {
          this.errorRPMsg = error.error.message;
        });
      } else {
        this.errorRPMsg = 'Password must be greater than 8 characters';
      }
    }
    else {
      this.errorRPMsg = 'Password and confirm password should be same'
    }
  }

  changeValue() {
    this.errorOtpMsg = ''
    this.errorMsg = ''
    this.errorOtpMsg = ''
    this.successOTPMsg = ''
    this.errorRPMsg = ''
  }

}
