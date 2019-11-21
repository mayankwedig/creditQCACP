import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { DateFormatService } from '../../../../shared/services/date-format.service';
import { RouterService } from '../../../../shared/services/router.service';
import { MasterService } from '../../../services/master.service';
import { CQEService } from '../../../services/cqe.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { CQERequestStatus } from '../../../../shared/constants/enum';
import { PaymentService } from '../../../services/payment.service';
import { UserStatus, PaymentType, PaymentStatus, PopupType } from '../../../../shared/constants/enum';
import { CommonService } from '../../../../shared/services/common.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { from } from 'rxjs';

@Component({
  selector: 'app-request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.css']
})
export class RequestReportComponent implements OnInit {

  @ViewChild('paytm_form') paytm_formEl;

  constructor(private userService: UserService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    public routerService: RouterService,
    private cqeService: CQEService,
    private localStorageService: LocalStorageService,
    private masterService: MasterService,
    private paymentService: PaymentService,
    private spinnerVisibilityService: SpinnerVisibilityService,
    private commonService: CommonService) { }

  postData: any = {}
  customerData: any = {}
  noCustomer = {
    id: 0,
    company_name: '',
    gst_no: '',
    is_defaulter: false
  };
  errorMessage = ''
  settings: any = {}
  paymentPost: any = {
    "customer_id": 0,
    "order_no": "",
    "amount": 0,
    "gst_amount": 0,
    "gst_per": 0,
    "total_amount": 0,
    "paid_amount": 0,
    "discount_amount": 0,
    "promo_code": "",
    "promo_applied": false,
    "payment_type": PaymentType.creditScore,
    "status": PaymentStatus.initialize,
    "transaction_id": "",
    "gate_way_name": "",
    "payment_method": "",
    "cgst_amount": 0,
    "sgst_amount": 0
  }

  paytmPostData: any = {}
  gstStateCode: string = "";
  ngOnInit() {
    this.getSettings()

  }

  getSettings() {
    this.masterService.setting().pipe().subscribe((result) => {
      this.settings = result.body;
      this.paymentPost.amount = this.settings.report_fee;
      if (this.gstStateCode != "08") { // IGST
        this.paymentPost.gst_per = this.settings.report_igst;
        this.paymentPost.gst_amount = Math.round(this.settings.report_fee * (this.settings.report_igst) / 100).toFixed(0);
        this.paymentPost.total_amount = parseFloat(this.settings.report_fee);
        this.paymentPost.paid_amount = parseFloat(this.paymentPost.gst_amount) + parseFloat(this.settings.report_fee);
      } else { //cgst
        this.paymentPost.cgst_amount = Math.round(this.settings.report_fee * (this.settings.report_cgst) / 100).toFixed(0);
        this.paymentPost.sgst_amount = Math.round(this.settings.report_fee * (this.settings.report_sgst) / 100).toFixed(0);
        this.paymentPost.total_amount = parseFloat(this.settings.report_fee);
        this.paymentPost.gst_amount = Math.round(this.settings.report_fee * (this.settings.report_cgst + this.settings.report_sgst) / 100).toFixed(0);
        this.paymentPost.paid_amount = parseFloat(this.paymentPost.gst_amount) + parseFloat(this.settings.report_fee);
      }
      this.paymentPost.discount_amount = 0;
    }, error => {
      this.errorHandlerService.handleError(error)
    });
  }

  getCustomer() {

    this.userService.userByGST(this.postData).pipe().subscribe((result) => {
      if (result != null) {
        this.customerData = result.body.length > 0 ? result.body[0] : this.noCustomer;
        if (result.body.length > 0) {
          this.gstStateCode = this.localStorageService.userDetails.gst_no.substr(0, 2);
          this.customerData.address = this.commonService.combineAddress(this.customerData);
          this.postData.gst_no = ""
          this.userService.checkDefaulter(this.customerData.id).pipe().subscribe((innerResult) => {
            if (innerResult != null) {
              this.customerData.is_defaulter = innerResult.body.isDefaulter;
            } else {
              this.errorHandlerService.defaultError()
            }
          }, error => {
            this.errorHandlerService.handleError(error)
          }
          );
        } else {
          this.errorMessage = 'No data available for "' + this.postData.gst_no + '"'
        }
      } else {
        this.errorHandlerService.defaultError()
      }
    }, error => {
      this.errorHandlerService.handleError(error)
    }
    );
  }

  search() {
    this.errorMessage = ''
    if (this.postData.gst_no != "" && this.postData.gst_no != null) {
      this.customerData = this.noCustomer;
      this.getCustomer()
      this.getSettings();
    }
  }

  redirectToPayment() {
    this.save()
  }

  reset() {
    this.customerData = this.noCustomer
  }

  save() {
    let data = {
      customer_id: this.customerData.id,
      submitted_by: this.localStorageService.userDetails.id,
      status: CQERequestStatus.pending
    }
    this.spinnerVisibilityService.hide()
    this.cqeService.saveRequest(data).pipe().subscribe((result) => {
      //this.errorHandlerService.successMessage('CIBIL Request successfully submitted. You receive an email with attached CIBIL Report.');
      // this.customerData = this.noCustomer
      this.proceedToPay()
    }, error => {
      this.spinnerVisibilityService.hide()
      this.errorHandlerService.handleError(error)
    }
    );
  }

  //Go to payment Gateway
  proceedToPay() {
    this.errorMessage = ''
    this.paymentPost.cir_customer_id = this.customerData.id;
    this.paymentPost.customer_id = this.localStorageService.userDetails.id;
    if (!this.paymentPost.promo_applied) {
      this.paymentPost.promo_code = ''
    }

    if (this.paymentPost.paid_amount == 0) {
      this.paymentPost.status = PaymentStatus.success;
    }
    this.paymentPost["cgst_amount"] = this.paymentPost.cgst_amount;
    this.paymentPost["igst_amount"] = this.paymentPost.gst_amount;
    this.paymentPost["sgst_amount"] = this.paymentPost.sgst_amount;
    this.paymentService.save(this.paymentPost).pipe().subscribe((result) => {
      // Here customer_no is the cir customer no, other customer no
      // email & mobile number is the login customer's

      let payData = {
        "customer_no": this.localStorageService.userDetails.customer_no,
        "amount": result.body.paid_amount,
        "email": this.localStorageService.userDetails.email,
        "mobile": this.localStorageService.userDetails.mobile,
        "order_no": result.body.order_no,
        "cgst_amount": this.paymentPost.cgst_amount,
        "igst_amount": this.paymentPost.gst_amount,
        "sgst_amount": this.paymentPost.sgst_amount
      }

      this.paymentService.generateChecksum(payData).pipe().subscribe((result) => {
        this.paytmPostData = result.body;
        let _this = this
        setTimeout(_ => {
          _this.paytm_formEl.nativeElement.submit()
          _this.spinnerVisibilityService.hide()
        }, 500);
      }, error => {
        this.spinnerVisibilityService.hide()
        this.errorHandlerService.handleError(error)
      });

    }, error => {
      this.spinnerVisibilityService.hide()
      this.errorHandlerService.handleError(error)
    });
  }


}
