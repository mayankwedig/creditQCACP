import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { SessionStorageService } from "../../../shared/services/session-storage.service";
import { RouterService } from "../../../shared/services/router.service";
import { ErrorHandlerService } from "../../../shared/services/error-handler.service";
import { UserService } from "../../services/user.service";
import { environment } from "../../../../environments/environment";
import { CommonService } from "../../../shared/services/common.service";
import { ClipboardService } from "ngx-clipboard";
import $ from "jquery";
declare var require: any;
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    public localStorageService: LocalStorageService,
    public sessionStorageService: SessionStorageService,
    public routerService: RouterService,
    private errorHandlerService: ErrorHandlerService,
    private userService: UserService,
    public commonService: CommonService,
    private _clipboardService: ClipboardService
  ) {}
  copy(text: string) {
    this._clipboardService.copyFromContent(text);
    alert("Text copied!");
  }
  fileBaseUrl: string =
    environment.services.files.baseUrl +
    environment.services.files.profileImage;
  loginUser: any = {};
  fileData: any;
  bankDetails: any = {};
  editBank: boolean = false;
  errorMessage: string = "";
  public profileImageError: String = "";
  public refferalLink = "";
  ngOnInit() {
    if (this.localStorageService.userDetails) {
      this.loginUser = this.localStorageService.userDetails;
      this.loginUser.avatar =
        this.fileBaseUrl + this.loginUser.id + "/" + this.loginUser.avatar;
      console.log(window.location.href);
      let replacedUrl = "ap/" + this.loginUser.referral_code;
      this.refferalLink = window.location.href.replace(
        "user/profile",
        replacedUrl
      );
      this.gerUserBank();
    } else {
      this.logout();
    }
  }

  logout() {
    this.sessionStorageService.flushOnLogout();
    this.routerService.RedirectHome();
  }

  handleInputChange(e) {
    this.profileImageError = "";
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      this.profileImageError = "Please select image only";
      //this.errorHandlerService.errorMessage('Please select image only');
      return false;
    }

    if (file.size > 5000000) {
      this.profileImageError = "Maximum image size is 5MB";
      //this.errorHandlerService.errorMessage('Maximum image size is 1mb KB')
      return false;
    }
    reader.onload = this._handleReaderLoaded.bind(this);

    this.fileData = file;
    this.savePic(file);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.loginUser.avatar = reader.result;
  }

  savePic(file) {
    let formData = new FormData();
    formData.append("id", this.loginUser.id);
    formData.append("avatar", file, file.name);
    formData.append("type", "user");
    formData.append("file", file);
    this.userService
      .uploadProfilePic(formData)
      .pipe()
      .subscribe(
        result => {
          if (result.success == true) {
            this.loginUser.avatar = result.body;
            this.sessionStorageService.setUserDetails(this.loginUser);
            this.errorHandlerService.successMessage(
              "Profile image successfully updated "
            );
            this.loginUser.avatar =
              this.fileBaseUrl +
              this.loginUser.id +
              "/" +
              this.loginUser.avatar;
          } else {
            this.errorHandlerService.defaultError();
          }
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
  }

  redirectChangePassword() {
    this.routerService.RedirectChangePassword();
  }

  /*************** BANK DETAILS   ************/

  editBankDetails(value: boolean = false) {
    this.editBank = value;
  }

  gerUserBank() {
    let data = { customer_id: this.loginUser.id, page_no: 0, page_size: 0 };
    this.userService
      .bankList(data)
      .pipe()
      .subscribe(
        result => {
          if (result.body.length > 0) {
            this.bankDetails = result.body[0];
          } else {
            this.bankDetails = {};
            this.bankDetails.id = 0;
            this.bankDetails.customer_id = this.loginUser.id;
          }
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
  }

  //Go to Five Step
  submitBank() {
    this.errorMessage = "";
    if (
      this.bankDetails.ifsc_code == null ||
      this.bankDetails.ifsc_code.trim() == ""
    ) {
      this.errorMessage = "IFSC Code is required.";
    } else if (
      this.bankDetails.branch_name == null ||
      this.bankDetails.branch_name.trim() == ""
    ) {
      this.errorMessage = "Branch name is required.";
    } else if (
      this.bankDetails.bank_name == null ||
      this.bankDetails.bank_name.trim() == ""
    ) {
      this.errorMessage = "Bank name is required.";
    } else if (
      this.bankDetails.account_name == null ||
      this.bankDetails.account_name.trim() == ""
    ) {
      this.errorMessage = "Account name is required.";
    } else if (
      this.bankDetails.account_no == null ||
      this.bankDetails.account_no.trim() == ""
    ) {
      this.errorMessage = "Account number is required.";
    } else if (
      this.bankDetails.confirm_account_no == null ||
      this.bankDetails.confirm_account_no.trim() == ""
    ) {
      this.errorMessage = "Confirm account number is required.";
    } else if (
      this.bankDetails.confirm_account_no != this.bankDetails.account_no
    ) {
      this.errorMessage =
        "Account number and confirm account number do not match.";
    } else if (
      this.bankDetails.id == null ||
      this.bankDetails.id == "" ||
      this.bankDetails.id == 0 ||
      this.bankDetails.id == "0"
    ) {
      this.userService
        .saveBank(this.bankDetails)
        .pipe()
        .subscribe(
          result => {
            this.errorHandlerService.successMessage(
              "bank details successfully saved."
            );
            this.editBankDetails(false);
            this.gerUserBank();
          },
          error => {
            this.errorMessage = error.error.message;
          }
        );
    } else {
      this.userService
        .updateBank(this.bankDetails)
        .pipe()
        .subscribe(
          result => {
            this.errorHandlerService.successMessage(
              "bank details successfully updated."
            );
            this.editBankDetails(false);
            this.gerUserBank();
          },
          error => {
            this.errorHandlerService.handleError(error);
          }
        );
    }
  }

  textChange() {
    this.errorMessage = "";
  }

  getBankByIFSC() {
    if (
      this.bankDetails.ifsc_code != null &&
      this.bankDetails.ifsc_code.trim() != ""
    ) {
      this.userService
        .bankByIFSC(this.bankDetails.ifsc_code)
        .pipe()
        .subscribe(
          result => {
            if (result.body) {
              this.bankDetails.branch_name = result.body.BRANCH;
              this.bankDetails.bank_name = result.body.BANK;
            }
          },
          error => {
            //this.errorMessage = error.error.message;
          }
        );
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
