import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { RouterService } from '../../../shared/services/router.service';
import { PopupType } from '../../../shared/constants/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrls: ['./payment-fail.component.css']
})
export class PaymentFailComponent implements OnInit {

  constructor(private commonService: CommonService,
    private routerService: RouterService,
    private route: ActivatedRoute) { }

    public failted_reason:String = "";
    public payment_type:String = "";
  
  ngOnInit() {
    
    this.failted_reason = atob(this.route.snapshot.queryParamMap.get('msg'));
    this.payment_type = atob(this.route.snapshot.queryParamMap.get('type'));
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
}
