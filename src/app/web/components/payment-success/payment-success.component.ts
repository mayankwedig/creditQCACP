import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { RouterService } from '../../../shared/services/router.service';
import { UserService } from '../../../user/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserStatus, PopupType } from '../../../shared/constants/enum';
import { SessionStorageService } from '../../../shared/services/session-storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private commonService: CommonService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,) { }
  //public success_message:String = "";
  public payment_type:String = "";
  customer_id:String = "";
  public errorMessage:String = "";
  ngOnInit() {
    // console.log(atob(this.route.snapshot.queryParamMap.get('msg')));
    // global.Buffer = global.Buffer || require('buffer').Buffer;
    // let buff = new Buffer(this.route.snapshot.queryParamMap.get('msg'), 'base64');
    // let text = buff.toString('ascii');
    // console.log(text);
    //this.success_message = atob(this.route.snapshot.queryParamMap.get('msg'));
    this.payment_type = atob(this.route.snapshot.queryParamMap.get('type'));
    this.customer_id = atob(this.route.snapshot.queryParamMap.get('cst'));
  }

  closePopup() {
    this.commonService.closePopup()
  }

  loginPopup() {
    this.commonService.closePopup()
    this.routerService.RedirectToPopup(PopupType.Login);
  }

  goTOHome() {
    this.routerService.RedirectHome();
  }
  goTODashbord() {
    this.routerService.RedirectDashboard();
  }
  goTOHomeLogin() {
    this.errorMessage = '';
    let login_data = {"customer_id": this.customer_id};
    this.userService.loginCUST(login_data).pipe().subscribe((result) => {
      if (result != null) {
        if (result.body.status == UserStatus.active) {
          this.sessionStorageService.setUserAuthDetails(result.body);
          this.sessionStorageService.setUserDetails(result.body);
          //this.closePopup()
          this.routerService.RedirectDashboard()
        } else {
          this.sessionStorageService.setUserRegistration(result.body);
          //this.openRegistration()
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