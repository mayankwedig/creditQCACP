import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { RouterService } from '../../../shared/services/router.service';
import { MasterService } from '../../../user/services/master.service';
import { UserService } from '../../../user/services/user.service';
import { UserStatus, PaymentType, PaymentStatus, PopupType } from '../../../shared/constants/enum';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { PaymentService } from '../../../user/services/payment.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';
import $ from "jquery";
declare var require: any

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  //providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class RegistrationComponent implements OnInit {

  @ViewChild('paytm_form') paytm_formEl;

  constructor(public commonService: CommonService
    , private routerService: RouterService
    , private masterService: MasterService
    , private userService: UserService
    , private sessionStorageService: SessionStorageService
    , private paymentService: PaymentService
    , private errorHandlerService: ErrorHandlerService
    , private spinnerVisibilityService: SpinnerVisibilityService) { }

  categories: any = []
  settings: any = {}
  bankDetails: any = { 'id': 0, 'customer_id': 0 }
  gstPercent: any = 0;
  errorMessage_Referral: String = ''
  errorMessage_Executive: String = ''
  public errorMessage_IFSC_code: String = ''
  //steps variable
  gstStep: boolean = true;
  userDetailStep: boolean = false;
  mobileVerifyStep: boolean = false;
  panStep: boolean = false;
  bankStep: boolean = false;
  paymentStep: boolean = false;
  haveReferralCode: boolean = false;
  haveExecutiveCode: boolean = false;
  errorMessage: string = null
  customerData: any = { "pan_no": null }
  postData: any = {}
  paytmPostData: any = {}
  successOTPMsg: String = "";
  noCustomer: any = {
    'id': '',
    'customer_id': '',
    'company_name': '',
    'email': '',
    'mobile': '',
    'gst_no': '',
    'udin_no': '',
    'status': ''
  }

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
    "payment_type": PaymentType.membership,
    "status": PaymentStatus.initialize,
    "transaction_id": "",
    "gate_way_name": "",
    "payment_method": "",
    "cgst_amount": 0,
    "sgst_amount": 0
  }
  isInvalidRefferalCode: boolean = false;
  gstStateCode: string = "";
  public registerTCError: String = "";
  ngOnInit() {
    this.errorMessage = '';
    //Check session from login screen
    if (this.sessionStorageService.userRegistration) {
      this.sessionStorageService.userRegistration.subscribe(data => {
        if (data) {
          this.userService.userByGST({ gst_no: data.gst_no }).pipe().subscribe((result) => {
            if (result != null && result.body.length > 0) {
              if (result.body[0]['pan_no'] == 'null') {
                result.body[0]['pan_no'] = "";
              }
              this.customerData = result.body[0];
              this.gstStateCode = this.customerData.gst_no.substr(0, 2);
              this.customerData.password = this.customerData.temp_password;
              this.customerData.referral_code = ''
              this.customerData.executive_code = ''
              this.customerData.address = this.commonService.combineAddress(this.customerData)

              //Get user Bank Details
              this.gerUserBank();
              //Setting
              this.getSettings()

              //Category
              this.getCategory()

              if (this.customerData.status == UserStatus.inactive) {
                this.gotoGSTStep();
              } else if (this.customerData.status == UserStatus.bank_pending) {
                this.gotoBankStep();
              } else if (this.customerData.status == UserStatus.payment_pending) {
                this.gotoPaymentStep();
              } else {
                this.gotoGSTStep();
              }
            }
          })
        }
      });
    }
    $(document).ready(function () {
      $('#txtIDAccountNo').bind("cut copy paste", function (e) {
        e.preventDefault();
      });
      $('#txtConfIDAccountNo').bind("cut copy paste", function (e) {
        e.preventDefault();
      });
    });
  }

  //Open Login Popup
  openLogin() {
    this.errorMessage = '';
    this.commonService.closePopup()
    this.routerService.RedirectToPopup(PopupType.Login);
  }

  closePopup() {
    this.commonService.closePopup()
    this.routerService.RedirectHome();
  }

  //Get settings
  getSettings() {
    this.errorMessage = '';
    this.masterService.setting().pipe().subscribe((result) => {
      this.settings = result.body;
      this.paymentPost.amount = this.settings.registration_fee;
      if (this.gstStateCode != "08") { // IGST
        this.paymentPost.gst_per = this.settings.registration_igst;
        this.paymentPost.gst_amount = Math.round(this.settings.registration_fee * (this.settings.registration_igst) / 100).toFixed(0);
        this.paymentPost.total_amount = parseFloat(this.settings.registration_fee);
        this.paymentPost.paid_amount = parseFloat(this.paymentPost.gst_amount) + parseFloat(this.settings.registration_fee);
      } else { //CGST
        // this.paymentPost.gst_per = this.settings.registration_cgst + this.settings.registration_sgst;
        this.paymentPost.cgst_amount = Math.round(this.settings.registration_fee * (this.settings.registration_cgst) / 100).toFixed(0);
        this.paymentPost.sgst_amount = Math.round(this.settings.registration_fee * (this.settings.registration_sgst) / 100).toFixed(0);
        this.paymentPost.total_amount = parseFloat(this.settings.registration_fee);
        this.paymentPost.gst_amount = Math.round(this.settings.registration_fee * (this.settings.registration_cgst + this.settings.registration_sgst) / 100).toFixed(0);
        this.paymentPost.paid_amount = parseFloat(this.paymentPost.gst_amount) + parseFloat(this.settings.registration_fee);
      }
      this.paymentPost.discount_amount = 0;

    }, error => {
      this.errorHandlerService.handleError(error)
    });
  }

  //Get categories
  getCategory() {
    this.errorMessage = '';
    this.masterService.category().pipe().subscribe((result) => {
      this.categories = result.body;
      this.categories.splice(this.categories.length, 0, {
        id: 0,
        name: 'Other'
      });

      this.categories.splice(0, 0, {
        id: -1,
        name: 'Select business category'
      });

      let dats = this.categories.filter(item => {
        return item.name.includes(this.customerData.category_name) == true;
      })

      if (dats.length > 0) {
        this.customerData.category_id = dats[0].id
      }

    }, error => {
      //this.errorHandlerService.handleError(error)
    });
  }

  //Get bank detail by customer id
  gerUserBank() {
    let data = { "customer_id": this.customerData.id, "page_no": 0, "page_size": 0 }
    this.userService.bankList(data).pipe().subscribe((result) => {
      if (result.body.length > 0) {
        this.bankDetails = result.body[0]
      } else {
        this.bankDetails = {}
        this.bankDetails.id = 0;
        this.bankDetails.customer_id = this.customerData.id
      }
    }, error => {
      //this.errorHandlerService.handleError(error)
    });
  }

  //redirect to registration/ home / GST screen
  gotoGSTStep() {
    this.errorMessage = '';
    this.gstStep = true;
    this.userDetailStep = false;
    this.mobileVerifyStep = false;
    this.panStep = false;
    this.bankStep = false;
    this.paymentStep = false;
  }

  //redirect to bank details screen
  gotoBankStep() {
    this.errorMessage = '';
    this.gstStep = false;
    this.userDetailStep = false;
    this.mobileVerifyStep = false;
    this.panStep = false;
    this.bankStep = true;
    this.paymentStep = false;
  }

  //redirect to PAN card screen
  gotoPANStep() {
    this.errorMessage = '';
    this.gstStep = false;
    this.userDetailStep = false;
    this.mobileVerifyStep = false;
    this.panStep = true;
    this.bankStep = false;
    this.paymentStep = false;
  }

  //redirect to user detail screen
  gotoUserDetailStep() {
    this.errorMessage = '';
    this.gstStep = false;
    this.userDetailStep = true;
    this.mobileVerifyStep = false;
    this.panStep = false;
    this.bankStep = false;
    this.paymentStep = false;
  }

  //redirect to verify mobile number step
  gotoVerifyOTPStep() {

    if (this.customerData.mobile_vefifed == true && this.customerData.vefifed_mobile_no == this.customerData.mobile) {

      this.gotoUserDetailStep();
    } else {
      this.errorMessage = '';
      this.gstStep = false;
      this.userDetailStep = false;
      this.mobileVerifyStep = true;
      this.panStep = false;
      this.bankStep = false;
      this.paymentStep = false;
    }
  }

  //redirect to payment screen
  gotoPaymentStep() {
    this.gstStateCode = this.customerData.gst_no.substr(0, 2);
    this.errorMessage = '';
    this.gstStep = false;
    this.userDetailStep = false;
    this.mobileVerifyStep = false;
    this.panStep = false;
    this.bankStep = false;
    this.paymentStep = true;
  }

  //Go to Second Step
  submitGST() {
    this.errorMessage = ''
    if (this.customerData.gst_no == null || this.customerData.gst_no == '' || this.customerData.gst_no.length != 15) {
      this.errorMessage = 'Please enter valid GST no'
    } else {
      this.userService.userByGST(this.customerData).pipe().subscribe((result) => {
        
        if (result != null && result.body.length > 0) {
          if (result.body[0].status == UserStatus.active) {
            this.errorMessage = 'GST Number already registered with us. Please login using your credential.'
          } else if (result.body[0].status == UserStatus.deleted || result.body[0].status == UserStatus.blocked) {
            this.errorMessage = 'Your account has been deactivated. Please contact to administrator for more information.'
          } else {
            if (result.body[0]["pan_no"] == 'null') {
              result.body[0]["pan_no"] = '';
            }
            this.customerData = result.body[0];
            this.gstStateCode = this.customerData.gst_no.substr(0, 2);
            this.customerData.password = this.customerData.temp_password;
            //this.customerData.category_id = this.customerData.category_id ? this.customerData.category_id : -1;
            this.customerData.referral_code = ''
            this.customerData.executive_code = ''
            this.customerData.address = this.commonService.combineAddress(this.customerData)
            this.customerData.acceptTC = false;
            //Setting
            this.getSettings()

            //Category
            this.getCategory()

            if (this.customerData.status == UserStatus.inactive || this.customerData.status == UserStatus.mobile_verify_pending) {
              this.gotoUserDetailStep();
            } else if (this.customerData.status == UserStatus.bank_pending) {
              this.gotoBankStep();
            } else if (this.customerData.status == UserStatus.payment_pending) {
              this.gotoPaymentStep();
            } else {
              this.gotoGSTStep();
            }

            //Get user Bank Details
            this.gerUserBank();
          }
        } else {
          this.errorMessage = 'No data available for "' + this.customerData.gst_no + '"'
        }
      }, error => {
        this.errorMessage = error.error.message;
      });
    }
  }

  //Update user details
  updateUser(step: number = 1) {
    this.errorMessage = '';
    this.userService.updateUser(this.customerData).pipe().subscribe((result) => {
      if (step == 3) {
        this.gotoPANStep();
      }
      if (step == 31) {
        let mobile_data = { mobile: this.customerData.mobile };
        this.userService.sendOTP(mobile_data).pipe().subscribe((result) => {

          this.gotoVerifyOTPStep();
        });
      }
      if (step == 4) {
        this.gotoBankStep();
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  resendotp() {
    let mobile_data = { mobile: this.customerData.mobile };
    this.userService.sendOTP(mobile_data).pipe().subscribe((result) => {
      this.successOTPMsg = 'OTP successfully resend.'
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  //Submit user screen
  submitDetails() {
    this.errorMessage = '';
    if (this.customerData.category_id < 0 || this.customerData.category_id == "" || this.customerData.category_id == null) {
      this.errorMessage = "Please select business category"
    } else if (this.customerData.category_id == 0 && (this.customerData.category_name == "" || this.customerData.category_name == null)) {
      this.errorMessage = "Please enter business category"
    } else if (this.customerData.category_id == 0 && this.customerData.category_name.trim() == "") {
      this.errorMessage = "Please enter business category"
    } else if (this.customerData.confirm_password != this.customerData.password) {
      this.errorMessage = "Password and confirm password should be same"
    } else if (this.customerData.acceptTC == null || this.customerData.acceptTC == false) {
      this.registerTCError = "Please check terms and conditions.";
    } else {
      this.errorMessage = "";
      this.registerTCError = "";
      this.customerData.status = UserStatus.mobile_verify_pending;
      if (this.customerData.mobile_vefifed == true && this.customerData.vefifed_mobile_no == this.customerData.mobile) {
        this.updateUser(3)
      } else {
        this.updateUser(31)
      }
    }
  }

  submitMobileVerifyStep() {
    this.errorMessage = '';
    if (this.customerData.mobile_vefify_otp != "") {

      let v_otp_data = { customer_id: this.customerData.id, otp: this.customerData.mobile_vefify_otp };
      this.userService.verifyOTP(v_otp_data).pipe().subscribe((result) => {

        this.customerData.mobile_vefifed = true;
        this.customerData.vefifed_mobile_no = this.customerData.mobile;

        this.updateUser(3);
      }, error => {
        this.errorMessage = error.error.message;
      });
    } else {
      this.errorMessage = "OTP is required";
    }
  }

  //Submit PAN card screen
  submitPanStep() {
    this.errorMessage = '';
    if (this.customerData.pan_no != '') {
      var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (regpan.test(this.customerData.pan_no)) {
        this.customerData.status = UserStatus.bank_pending;
        this.updateUser(4)
      } else {
        this.errorMessage = 'Invalid PAN number'
      }
      if (this.customerData.pan_no.length != 10) {
        this.errorMessage = 'Invalid PAN number'
      }
    } else {
      this.customerData.status = UserStatus.bank_pending;
      this.updateUser(4)
    }
  }

  //Submit Bank details screen
  submitBank() {
    this.errorMessage = ''
    if (this.bankDetails.ifsc_code == null || this.bankDetails.ifsc_code.trim() == '') {
      this.errorMessage = 'IFSC Code is required.'
    } else if (this.bankDetails.branch_name == null || this.bankDetails.branch_name.trim() == '') {
      this.errorMessage = 'Branch name is required.'
    } else if (this.bankDetails.bank_name == null || this.bankDetails.bank_name.trim() == '') {
      this.errorMessage = 'Bank name is required.'
    } else if (this.bankDetails.account_name == null || this.bankDetails.account_name.trim() == '') {
      this.errorMessage = 'Account name is required.'
    } else if (this.bankDetails.account_no == null || this.bankDetails.account_no.trim() == '') {
      this.errorMessage = 'Account number is required.'
    } else if (this.bankDetails.confirm_account_no == null || this.bankDetails.confirm_account_no.trim() == '') {
      this.errorMessage = 'Confirm account number is required.'
    } else if (this.bankDetails.confirm_account_no != this.bankDetails.account_no) {
      this.errorMessage = 'Account number and confirm account number not match.'
    } else if (this.bankDetails.id == null || this.bankDetails.id == '' || this.bankDetails.id == 0 || this.bankDetails.id == '0') {
      this.customerData.status = UserStatus.payment_pending;
      this.updateUser()
      this.userService.saveBank(this.bankDetails).pipe().subscribe((result) => {
        this.bankDetails.id = result.body.id;
        this.bankStep = false;
        this.paymentStep = true;
      }, error => {
        this.errorMessage = error.error.message;
      });
    }
    else {
      this.userService.updateBank(this.bankDetails).pipe().subscribe((result) => {

        this.customerData.status = UserStatus.payment_pending;
        this.updateUser();

        this.bankStep = false;
        this.paymentStep = true;

      }, error => {
        this.errorMessage = error.error.message;
      });
    }

  }

  //Go to payment Gateway
  proceedToPay() {

    this.errorMessage = ''
    this.paymentPost.customer_id = this.customerData.id;
    if (!this.paymentPost.promo_applied) {
      this.paymentPost.promo_code = ''
    }

    if (this.paymentPost.paid_amount == 0) {
      this.paymentPost.status = PaymentStatus.success;
    }

    this.spinnerVisibilityService.show()
    this.paymentPost["cgst_amount"] = this.paymentPost.cgst_amount;
    this.paymentPost["igst_amount"] = this.paymentPost.gst_amount;
    this.paymentPost["sgst_amount"] = this.paymentPost.sgst_amount;
    this.paymentService.save(this.paymentPost).pipe().subscribe((result) => {

      let payData = {
        "customer_no": this.customerData.customer_no,
        "amount": result.body.paid_amount,
        "email": this.customerData.email,
        "mobile": this.customerData.mobile,
        "order_no": result.body.order_no,
        "cgst_amount": this.paymentPost.cgst_amount,
        "igst_amount": this.paymentPost.gst_amount,
        "sgst_amount": this.paymentPost.sgst_amount
      }

      if (result.body.paid_amount > 0) {

        this.paymentService.generateChecksum(payData).pipe().subscribe((result) => {

          this.paytmPostData = result.body;
          let _this = this;
          setTimeout(_ => {
            _this.paytm_formEl.nativeElement.submit()
            _this.spinnerVisibilityService.hide()
          }, 500);
        }, error => {
          this.spinnerVisibilityService.hide()
          this.errorHandlerService.handleError(error)
        });
      } else {
        this.customerData.status = UserStatus.active;
        this.updateUser();
        this.spinnerVisibilityService.hide()
        this.commonService.closePopup();
        this.commonService.openSuccessPopup(PaymentSuccessComponent, 'Payment Success')
      }
    }, error => {
      this.spinnerVisibilityService.hide()
      this.errorHandlerService.handleError(error)
    });
  }

  //Clear error message
  textChange() {
    this.errorMessage_Referral = ''
    this.errorMessage = ''
    this.errorMessage_Executive = ''
    this.errorMessage_IFSC_code = ''
  }

  //Get bank detail by IFSC code
  getBankByIFSC() {
    this.errorMessage = '';
    if (this.bankDetails.ifsc_code != null && this.bankDetails.ifsc_code.trim() != '') {
      this.userService.bankByIFSC(this.bankDetails.ifsc_code).pipe().subscribe((result) => {
        if (result.body) {
          this.bankDetails.branch_name = result.body.BRANCH
          this.bankDetails.bank_name = result.body.BANK

        } else {
          this.errorMessage_IFSC_code = 'Invalid IFSC Code or Bank data not found';
        }
      }, error => {
        this.errorMessage = error.error.message;
      });
    }
  }

  //Apply promo code
  applyPromo() {
    this.errorMessage = ''
    let catData = this.categories.filter(item => {
      return item.id == this.customerData.category_id
    })
    let payData = {
      "promo_code": this.paymentPost.promo_code,
      "category_id": this.customerData.category_id,
      "category_name": catData.length > 0 ? catData[0].name : '',
      "amount": this.paymentPost.amount
    }
    this.paymentService.applyPromoCode(payData).pipe().subscribe((result) => {
      if (this.gstStateCode != "08") {
        this.paymentPost.paid_amount = this.paymentPost.total_amount - result.body.discount;
        this.paymentPost.gst_amount = Math.round(this.paymentPost.paid_amount * (this.settings.registration_igst) / 100).toFixed(0);
        this.paymentPost.paid_amount = parseFloat(this.paymentPost.gst_amount) + parseFloat(this.paymentPost.paid_amount);
      } else {
        this.paymentPost.paid_amount = this.paymentPost.total_amount - result.body.discount;
        this.paymentPost.cgst_amount = Math.round(this.paymentPost.paid_amount * (this.settings.registration_cgst) / 100).toFixed(0);
        this.paymentPost.sgst_amount = Math.round(this.paymentPost.paid_amount * (this.settings.registration_sgst) / 100).toFixed(0);
        this.paymentPost.gst_amount = Math.round(this.paymentPost.paid_amount * (this.settings.registration_cgst + this.settings.registration_sgst) / 100).toFixed(0);
        this.paymentPost.paid_amount = parseFloat(this.paymentPost.gst_amount) + parseFloat(this.paymentPost.paid_amount);
      }

      this.paymentPost.discount_amount = result.body.discount;
      this.paymentPost.promo_applied = true;
    }, error => {
      this.errorMessage = error.error.message;
    });

  }

  //Remove promo code
  removePromo() {

    this.errorMessage = ''
    this.getSettings();
    this.paymentPost.discount_amount = 0;
    this.paymentPost.promo_applied = false;
    this.paymentPost.promo_code = '';
  }

  //Apply referral code
  applyReferralCode() {
    this.errorMessage = '';
    this.errorMessage_Referral = ''
    this.userService.applyReferralCode(this.customerData).pipe().subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.isInvalidRefferalCode = false;
      } else {
        this.isInvalidRefferalCode = true;
      }

    }, error => {
      //this.customerData.referral_code = '';
      this.isInvalidRefferalCode = true;
      this.errorMessage_Referral = error.error.message;
    });

  }

  //Apply Executive code
  applyExecutiveCode() {
    this.errorMessage = '';
    this.errorMessage_Executive = ''
    this.userService.applyExecutiveCode(this.customerData.executive_code).pipe().subscribe((result) => {

    }, error => {
      this.customerData.executive_code = ''
      this.errorMessage_Executive = error.error.message;
    });

  }

}