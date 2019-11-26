import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DefaulterService } from "../../../services/defaulter.service";
import { UserService } from "../../../services/user.service";
import { ErrorHandlerService } from "../../../../shared/services/error-handler.service";
import { DateFormatService } from "../../../../shared/services/date-format.service";
import { RouterService } from "../../../../shared/services/router.service";
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { DateFormatEnum, StatusEnum } from "../../../../shared/constants/enum";
import { ConfirmDialogService } from "../../../../shared/services/confirm-dialog.service";
import { CommonService } from "../../../../shared/services/common.service";
import { SessionStorageService } from "../../../../shared/services/session-storage.service";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-upload-users-defaulter",
  templateUrl: "./upload-users-defaulter.component.html",
  styleUrls: ["./upload-users-defaulter.component.css"]
})
export class UploadUsersDefaulterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private defaulterService: DefaulterService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    public routerService: RouterService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmDialogService,
    public sessionStorageService: SessionStorageService,
    private commonService: CommonService
  ) {}
  successOTPMsg: String = "";
  public header: String = "";
  postData: any = {};
  uidnRex = "^[0-9]*$";
  maxDate: any = "";
  mobileVerifyStep: boolean = false;
  isResendButtonDisabled: boolean = false;
  customerData: any = {
    id: 0,
    customer_id: "",
    submitted_by: "",
    company_name: "",
    email: "",
    mobile: "",
    gst_no: "",
    udin_no: "",
    payment_due_date: "",
    payment_due_amount: "",
    description: "",
    legal_case: null,
    status: "",
    settlement_date: "",
    settlement_amount: "",
    settlement_finish: "",
    address: "",
    temp_payment_due_date: ""
  };
  mobileVerification = {
    mobile_verified: false,
    verifiedMobileNumber: "",
    selectedMemberMobileNumber: "8769433262",
    mobile_verify_otp: "",
    selectedMemberId: "74"
  };
  request_id: any = "";

  noCustomer = {
    id: "",
    customer_id: "",
    submitted_by: "",
    company_name: "",
    email: "",
    mobile: "",
    gst_no: "",
    udin_no: "",
    payment_due_date: "",
    payment_due_amount: "",
    description: "",
    legal_case: null,
    status: "",
    settlement_date: "",
    settlement_amount: "",
    settlement_finish: ""
  };

  documents = {
    defaulter_id: 0,
    title: "",
    file: ""
  };

  public ledgerFileName: String = "Upload Ledger";
  public caFileName: String = "Upload CA Certificate";
  public otherFileName: String = "Upload Other File (Optional)";
  public searchGSTnumberError: String = "";
  public addDefaulterGSTnumberError: String = "";
  public addDefaulterEmailError: String = "";
  public addDefaulterMobileError: String = "";
  public addDefaulterLedgerFileError: String = "";
  public addDefaulterCAFileError: String = "";
  public addDefaulterOtherFileError: String = "";
  public addDefaulterDueAmountError: String = "";
  public addUDINError: String = "";
  public addDefaulterDueDateError: String = "";
  public addDefaulterTCError: String = "";
  public selectLegalCaseError: string = "";
  loginUserID: String = "";

  ledgerFile: any = null;
  caFile: any = null;
  otherFile: any = null;
  errorMessage = "";
  nextStep: boolean = false;

  ngOnInit() {
    let cDate = new Date();
    let gDate = cDate.setDate(cDate.getDate() - 1);
    let currDateSplit = formatDate(gDate, "yyyy/MM/dd", "en").split("/");
    this.maxDate = {
      year: parseInt(currDateSplit[0]),
      month: parseInt(currDateSplit[1]),
      day: parseInt(currDateSplit[2])
    };
    if (this.localStorageService.userDetails) {
      this.loginUserID = this.localStorageService.userDetails.id;
    } else {
      this.logout();
    }
    this.activatedRoute.params.subscribe(params => {
      if (params.id != null && params.id !== undefined) {
        this.request_id = atob(params.id); //(+) converts string 'id' to a number
        this.getDetails(this.request_id);
      }
    });
    this.activatedRoute.data.subscribe(params => {
      this.header = params.header;
    });
  }
  //redirect to verify mobile number step
  verifySelectedUserMobileNumber() {
    let mobile_data = {
      mobile: this.mobileVerification.selectedMemberMobileNumber
    };
    this.userService
      .sendOTP(mobile_data)
      .pipe()
      .subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.gotoVerifyOTPStep();
        } else {
          this.errorHandlerService.GSTINError(result.message);
        }
      });
  }
  submitMobileVerifyStep() {
    this.errorMessage = "";
    if (this.mobileVerification.mobile_verify_otp != "") {
      let v_otp_data = {
        customer_id: this.mobileVerification.selectedMemberId,
        otp: this.mobileVerification.mobile_verify_otp
      };
      this.userService
        .verifyOTP(v_otp_data)
        .pipe()
        .subscribe(
          result => {
            this.mobileVerification.mobile_verified = true;
            this.mobileVerification.verifiedMobileNumber = this.mobileVerification.selectedMemberId;
            this.mobileVerifyStep = false;
            this.save(this.header);
          },
          error => {
            this.errorMessage = error.error.message;
          }
        );
    } else {
      this.errorMessage = "OTP is required";
    }
  }
  gotoVerifyOTPStep() {
    this.errorMessage = "";
    this.mobileVerifyStep = true;
  }
  textChange() {
    this.errorMessage = "";
  }
  timeLeft: number = 60;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resendotp() {
    this.startTimer();
    this.isResendButtonDisabled = true;
    let mobile_data = {
      mobile: this.mobileVerification.selectedMemberMobileNumber
    };
    this.userService
      .sendOTP(mobile_data)
      .pipe()
      .subscribe(
        result => {
          this.successOTPMsg = "OTP successfully resend.";
          setTimeout(() => {}, 10000);
          setTimeout(() => {
            this.successOTPMsg = "";
            this.isResendButtonDisabled = false;
            this.timeLeft = 60;
          }, 10000);
        },
        error => {
          this.isResendButtonDisabled = false;
          this.errorMessage = error.error.message;
        }
      );
  }

  logout() {
    this.sessionStorageService.flushOnLogout();
    this.routerService.RedirectHome();
  }

  getDetails(id) {
    this.defaulterService
      .getById(id)
      .pipe()
      .subscribe(
        result => {
          if (result != null) {
            this.customerData = result.body;
            this.customerData.address = this.commonService.combineAddress(
              this.customerData
            );
            let dueDateSlice = this.customerData.payment_due_date.split("-");
            this.customerData.payment_due_date = {
              year: parseInt(dueDateSlice[0]),
              month: parseInt(dueDateSlice[1]),
              day: parseInt(dueDateSlice[2])
            };
            this.customerData.acceptTC = true;
            this.customerData.legal_case =
              this.customerData.legal_case == "yes" ? true : false;
            this.ledgerFileName = this.customerData.documents[1].file;
            this.caFileName = this.customerData.documents[0].file;
            if (this.customerData.documents.length > 2) {
              this.otherFileName = this.customerData.documents[2].file;
            }
          } else {
            this.errorHandlerService.defaultError();
          }
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
  }

  getCustomer() {
    this.userService
      .userByGST(this.postData)
      .pipe()
      .subscribe(
        result => {
          if (result != null) {
            this.customerData =
              result.body.length > 0 ? result.body[0] : this.noCustomer;
            this.customerData.address = this.commonService.combineAddress(
              this.customerData
            );
            this.customerData.legal_case = null; // this.customerData.legal_case == "yes" ? true : false;
            if (result.body.length == 0) {
              this.errorMessage =
                'No data available for "' + this.postData.gst_no + '"';
            }
          } else {
            this.errorHandlerService.defaultError();
          }
        },
        error => {
          this.searchGSTnumberError = error.error.message;
          //this.errorHandlerService.handleError(error)
        }
      );
  }

  search() {
    this.errorMessage = "";
    this.searchGSTnumberError = "";
    if (this.postData.gst_no != "" && this.postData.gst_no != null) {
      this.customerData = this.noCustomer;
      this.userService
        .checkCustomerNewDefaulter({
          gst_no: this.postData.gst_no,
          login_customer_id: this.loginUserID
        })
        .pipe()
        .subscribe(
          result => {
            if (result.body.isMyDefaulter) {
              this.searchGSTnumberError = result.body.message;
            } else {
              this.getCustomer();
            }
          },
          error => {
            this.searchGSTnumberError = error.error.message;
            //this.errorHandlerService.handleError(error)
          }
        );
    } else {
      this.searchGSTnumberError = "GST number cannot be blank.";
    }
  }

  reset() {
    this.customerData = this.noCustomer;
  }
  save(req_process_type) {
    this.userService
      .checkCustomerNewDefaulter({
        gst_no: this.customerData.gst_no,
        login_customer_id: this.loginUserID
      })
      .pipe()
      .subscribe(
        result => {
          if (result.body.isMyDefaulter) {
            this.errorHandlerService.GSTINError(result.body.message);
          } else {
            this.removeError();
            this.customerData.customer_id = this.customerData.id;
            this.customerData.submitted_by = this.localStorageService.userDetails.id;
            let dueDate =
              (this.customerData.temp_payment_due_date.day < 10
                ? "0" + this.customerData.temp_payment_due_date.day
                : this.customerData.temp_payment_due_date.day) +
              "/" +
              (this.customerData.temp_payment_due_date.month < 10
                ? "0" + this.customerData.temp_payment_due_date.month
                : this.customerData.temp_payment_due_date.month) +
              "/" +
              this.customerData.temp_payment_due_date.year;
            if (
              this.customerData.gst_no == "" ||
              this.customerData.gst_no == null ||
              this.customerData.gst_no == 0
            ) {
              this.errorHandlerService.errorMessage(
                "GST number cannot be blank."
              );
            } else if (
              this.customerData.email == "" ||
              this.customerData.email == null ||
              this.customerData.email == 0
            ) {
              this.errorHandlerService.errorMessage("Email cannot be blank.");
            } else if (
              this.customerData.mobile == "" ||
              this.customerData.mobile == null ||
              this.customerData.mobile == 0
            ) {
              this.errorHandlerService.errorMessage(
                "Mobile number cannot be blank."
              );
            } else if (this.customerData.mobile.length != 10) {
              this.errorHandlerService.errorMessage("Invalid Mobile number.");
            } else if (this.customerData.udin_no.length != 15) {
              //this.errorHandlerService.errorMessage('Invalid UDIN number.');
              this.addUDINError = "Invalid UDIN number.";
            } else if (
              this.customerData.payment_due_amount == "" ||
              this.customerData.payment_due_amount == null ||
              this.customerData.payment_due_amount == 0
            ) {
              //this.errorHandlerService.errorMessage('Due amount cannot be blank.');
              this.addDefaulterDueAmountError = "Due amount cannot be blank.";
            } else if (
              parseFloat(this.customerData.payment_due_amount) < 10000
            ) {
              //this.errorHandlerService.errorMessage('Due amount cannot be less then Rs. 10000/-.');
              this.addDefaulterDueAmountError =
                "Due amount cannot be less then Rs. 10000/-";
            } else if (
              this.customerData.temp_payment_due_date == "" ||
              this.customerData.temp_payment_due_date == null
            ) {
              //this.errorHandlerService.errorMessage('Payment due date cannot be blank.');
              this.addDefaulterDueDateError =
                "Payment due date cannot be blank.";
            } else if (
              this.ledgerFileName == "" ||
              this.ledgerFileName == "Upload Ledger"
            ) {
              //this.errorHandlerService.errorMessage('Please upload Ledger.');
              this.addDefaulterLedgerFileError = "Please upload Ledger.";
            } else if (
              this.caFileName == "" ||
              this.caFileName == "Upload CA Certificate"
            ) {
              //this.errorHandlerService.errorMessage('Please upload CA Certificate.');
              this.addDefaulterCAFileError = "Please upload CA Certificate.";
            } else if (
              this.customerData.acceptTC == null ||
              this.customerData.acceptTC == false
            ) {
              //this.errorHandlerService.errorMessage('Please check terms and conditions.');
              this.addDefaulterTCError = "Please check terms and conditions.";
            } else {
              this.confirmationDialogService
                .confirm("Please confirm", "Are you sure you want to process?")
                .then(confirmed => {
                  if (confirmed) {
                    this.customerData.legal_case = this.customerData.legal_case
                      ? "yes"
                      : "no";
                    if (
                      this.customerData.temp_payment_due_date == undefined ||
                      this.customerData.temp_payment_due_date == "undefined"
                    ) {
                      this.customerData.temp_payment_due_date = dueDate;
                    }
                    if (
                      this.customerData.payment_due_date == undefined ||
                      this.customerData.payment_due_date == "undefined"
                    ) {
                      this.customerData.payment_due_date = dueDate;
                    }
                    let paymentDueDateSplit = dueDate.split("/"); //2019/10/9
                    this.customerData.payment_due_date =
                      paymentDueDateSplit[2] +
                      "-" +
                      paymentDueDateSplit[1] +
                      "-" +
                      paymentDueDateSplit[0];
                    //console.log(this.customerData.status);
                    if (
                      this.customerData.status == "inactive" ||
                      this.customerData.status == ""
                    ) {
                      this.customerData.status = "pending";
                    }

                    this.defaulterService
                      .saveRequest(this.customerData)
                      .pipe()
                      .subscribe(
                        result => {
                          //Upload CA certificate
                          if (this.caFile != null) {
                            let formData = new FormData();
                            formData.append("id", result.body.id);
                            formData.append("document", this.caFile);
                            formData.append("type", "document");
                            formData.append("file", this.caFile);
                            formData.append("title", "CA Certificate");
                            this.userService
                              .uploadProfilePic(formData)
                              .pipe()
                              .subscribe(
                                result => {},
                                error => {
                                  //this.errorHandlerService.handleError(error)
                                }
                              );
                          }
                          //Upload ledger
                          if (this.ledgerFile != null) {
                            let ledgerFormData = new FormData();
                            ledgerFormData.append("id", result.body.id);
                            ledgerFormData.append("document", this.ledgerFile);
                            ledgerFormData.append("type", "document");
                            ledgerFormData.append("file", this.ledgerFile);
                            ledgerFormData.append("title", "Ledger");
                            this.userService
                              .uploadProfilePic(ledgerFormData)
                              .pipe()
                              .subscribe(
                                result => {},
                                error => {
                                  //this.errorHandlerService.handleError(error)
                                }
                              );
                          }

                          //Other files
                          if (this.otherFile != null) {
                            let otherFormData = new FormData();
                            otherFormData.append("id", result.body.id);
                            otherFormData.append("document", this.otherFile);
                            otherFormData.append("type", "document");
                            otherFormData.append("file", this.otherFile);
                            otherFormData.append("title", "Other");
                            this.userService
                              .uploadProfilePic(otherFormData)
                              .pipe()
                              .subscribe(
                                result => {},
                                error => {
                                  //this.errorHandlerService.handleError(error)
                                }
                              );
                          }
                          this.errorHandlerService.successMessage(
                            "Defaulter Request successfully submitted."
                          );
                          this.routerService.RedirectDefaulter();
                        },
                        error => {
                          this.errorHandlerService.handleError(error);
                        }
                      );
                  }
                })
                .catch(() => {});
            }
          }
        },
        error => {
          //this.searchGSTnumberError = error.error.message;
          this.errorHandlerService.GSTINError(error.error.message);
        }
      );
  }

  back() {
    this.nextStep = false;
  }
  removeError() {
    this.errorMessage = "";
    this.addDefaulterGSTnumberError = "";
    this.addDefaulterEmailError = "";
    this.addDefaulterMobileError = "";

    this.addDefaulterLedgerFileError = "";
    this.addDefaulterCAFileError = "";
    this.addDefaulterOtherFileError = "";
    this.addDefaulterDueAmountError = "";
    this.addUDINError = "";
    this.addDefaulterDueDateError = "";
    this.selectLegalCaseError = "";
    this.addDefaulterTCError = "";
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  proceed() {
    this.removeError();
    if (
      this.customerData.gst_no == "" ||
      this.customerData.gst_no == null ||
      this.customerData.gst_no == 0
    ) {
      this.addDefaulterGSTnumberError = "GST number cannot be blank.";
    }
    if (
      this.customerData.email == "" ||
      this.customerData.email == null ||
      this.customerData.email == 0
    ) {
      this.addDefaulterEmailError = "Email cannot be blank.";
      //this.errorMessage = 'Email cannot be blank.';
    } else {
      if (
        this.customerData.email ==
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      ) {
        this.addDefaulterEmailError = "Invalid email address.";
      }
    }
    if (
      this.customerData.mobile == "" ||
      this.customerData.mobile == null ||
      this.customerData.mobile == 0
    ) {
      this.addDefaulterMobileError = "Mobile number cannot be blank.";
    } else if (this.customerData.mobile.length != 10) {
      this.addDefaulterMobileError = "Invalid Mobile number.";
    }

    if (
      this.addDefaulterGSTnumberError == "" &&
      this.addDefaulterEmailError == "" &&
      this.addDefaulterMobileError == ""
    ) {
      this.nextStep = true;
    }
  }

  //Handle Ledger file
  handleLedgerChange(e) {
    this.addDefaulterLedgerFileError = "";
    this.ledgerFile = null;
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /pdf-*/;
    if (!file.type.match(pattern)) {
      //this.errorHandlerService.errorMessage('Please select pdf only');
      this.addDefaulterLedgerFileError = "Please select pdf only";
      return false;
    }

    if (file.size > 2000000) {
      //this.errorHandlerService.errorMessage('Maximum image size is 2MB')
      this.addDefaulterLedgerFileError = "Maximum image size is 2MB";
      return false;
    }
    this.ledgerFileName = file.name;
    this.ledgerFile = file;
  }

  //Handle Other file
  handleOtherChange(e) {
    this.addDefaulterOtherFileError = "";
    this.otherFile = null;
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /pdf-*/;
    if (!file.type.match(pattern)) {
      //this.errorHandlerService.errorMessage('Please select pdf only');
      this.addDefaulterOtherFileError = "Please select pdf only";
      return false;
    }

    if (file.size > 2000000) {
      this.addDefaulterOtherFileError = "Maximum image size is 2MB";
      //this.errorHandlerService.errorMessage('Maximum image size is 2MB')
      return false;
    }
    this.otherFileName = file.name;
    this.otherFile = file;
  }

  //Handle CA Certificate file
  handleCAChange(e) {
    this.addDefaulterCAFileError = "";
    this.caFile = null;
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /pdf-*/;
    if (!file.type.match(pattern)) {
      //this.errorHandlerService.errorMessage('Please select pdf only');
      this.addDefaulterCAFileError = "Please select pdf only";
      return false;
    }

    if (file.size > 2000000) {
      //this.errorHandlerService.errorMessage('Maximum image size is 2MB')
      this.addDefaulterCAFileError = "Maximum image size is 2MB";
      return false;
    }
    this.caFileName = file.name;
    this.caFile = file;
  }

  cancelRequest(frm: NgForm) {
    this.removeError();
    frm.reset();
    this.ledgerFileName = "Upload Ledger";
    this.caFileName = "Upload CA Certificate";
    this.otherFileName = "Upload Other File";
    this.ledgerFile = null;
    this.caFile = null;
    this.otherFile = null;
    this.errorMessage = "";
    this.nextStep = false;
    this.customerData = this.noCustomer;
    this.routerService.RedirectUploadDefaulter();
  }
}
