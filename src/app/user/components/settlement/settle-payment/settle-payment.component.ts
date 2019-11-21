import { Component, OnInit, Input } from "@angular/core";
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { DefaulterService } from "../../../services/defaulter.service";
import { ErrorHandlerService } from "../../../../shared/services/error-handler.service";
import { CommonService } from "../../../../shared/services/common.service";
import {
  DateFormatEnum,
  SettlementType
} from "../../../../shared/constants/enum";
import { DateFormatService } from "../../../../shared/services/date-format.service";
import { RouterService } from "../../../../shared/services/router.service";
import * as $ from "node_modules/jquery";
import { ConfirmDialogService } from "../../../../shared/services/confirm-dialog.service";
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-settle-payment",
  templateUrl: "./settle-payment.component.html",
  styleUrls: ["./settle-payment.component.css"]
})
export class SettlePaymentComponent implements OnInit {
  model: NgbDateStruct;

  constructor(
    private defaulterService: DefaulterService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    public routerService: RouterService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private confirmationDialogService: ConfirmDialogService,
    public localStorageService: LocalStorageService
  ) {}
  loginUser: any = {};
  public dataFormat = DateFormatEnum;
  @Input() data: any = {
    settlement_amount: 0,
    settlement_date1: "",
    amount: 0
  };
  request_id: any = 0;
  settlementTypeText: string = SettlementType.Full;
  redirectUrl: any = "defaulter";
  public spDueDateError: String = "";
  public spSettlementAmountError: String = "";
  maxDate: any = "";
  minDate: any = "";
  ngOnInit() {
    let currDateSplit = formatDate(new Date(), "yyyy/MM/dd", "en").split("/");
    this.maxDate = {
      year: parseInt(currDateSplit[0]),
      month: parseInt(currDateSplit[1]),
      day: parseInt(currDateSplit[2])
    };
    if (this.localStorageService.userDetails) {
      this.loginUser = this.localStorageService.userDetails;
    }
    //redirect url
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.type) {
        this.settlementTypeText = params.type;
      }
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.request_id = atob(params.id);
        if (
          this.request_id != null &&
          this.request_id != "undefined" &&
          this.request_id != undefined &&
          this.request_id != "" &&
          this.request_id != 0
        ) {
          this.getDetails(this.request_id);
        } else {
          this.request_id = 0;
        }
      }
    });
  }
  removeError() {
    this.spDueDateError = "";
    this.spSettlementAmountError = "";
  }
  getDetails(id) {
    this.defaulterService
      .getById(id)
      .pipe()
      .subscribe(
        result => {
          if (result != null) {
            this.data = result.body;
            this.data.settlement_amount = this.data.settlement_amount
              ? this.data.settlement_amount
              : 0;
            this.data.temp_settlement_finish =
              this.data.settlement_finish == "yes" ? true : false;
            this.data.payment_due_date = this.dateFormatService.momentDateFormat(
              this.data.payment_due_date
            );

            if (this.data.settlement_date != null) {
              let dateToParse = "";
              dateToParse = this.data.settlement_date.split("-");
              let year: any = dateToParse[0];
              let month: any = dateToParse[1];
              let dt: any = dateToParse[2];
              if (dt < 10) {
                dt = "0" + dt;
              }
              if (month < 10) {
                month = "0" + month;
              }
              this.minDate = {
                year: parseInt(year),
                month: parseInt(month),
                day: parseInt(dt)
              };
            } else {
              let date = new Date(this.data.created);
              let year: any = date.getFullYear();
              let month: any = date.getMonth() + 1;
              let dt: any = date.getDate();
              if (dt < 10) {
                dt = "0" + dt;
              }
              if (month < 10) {
                month = "0" + month;
              }
              this.minDate = {
                year: parseInt(year),
                month: parseInt(month),
                day: parseInt(dt)
              };
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

  save() {
    this.removeError();
    let settleDate =
      (this.data.settlement_date1.day < 10
        ? "0" + this.data.settlement_date1.day
        : this.data.settlement_date1.day) +
      "/" +
      (this.data.settlement_date1.month < 10
        ? "0" + this.data.settlement_date1.month
        : this.data.settlement_date1.month) +
      "/" +
      this.data.settlement_date1.year;

    if (
      this.data.amount == null ||
      this.data.amount == "" ||
      this.data.amount == 0 ||
      this.data.amount == "0.00" ||
      this.data.amount == "0"
    ) {
      //this.errorHandlerService.errorMessage('Settlement amount cannot be blank or zero.')
      this.spSettlementAmountError =
        "Settlement amount cannot be blank or zero.";
    } else if (
      this.data.settlement_date1 == "" ||
      this.data.settlement_date1 == null
    ) {
      this.errorHandlerService.errorMessage("Settlement date cannot be blank.");
    } else if (
      parseFloat(this.data.settlement_amount) + parseFloat(this.data.amount) >
      parseFloat(this.data.payment_due_amount)
    ) {
      //this.errorHandlerService.errorMessage('Settlement amount cannot be greater then remaining amount.')
      this.spSettlementAmountError =
        "Settlement amount cannot be greater then remaining amount.";
    } else if (
      parseFloat(this.data.settlement_amount) + parseFloat(this.data.amount) >=
        parseFloat(this.data.payment_due_amount) &&
      this.settlementTypeText == "Partial"
    ) {
      //this.errorHandlerService.errorMessage('Settlement amount cannot equal to due amount, in the case of partial payment.')
      this.spSettlementAmountError =
        "Settlement amount cannot equal to due amount, in the case of partial payment.";
    } else if (
      !this.dateFormatService.checkDateGreaterEqual(
        this.data.payment_due_date,
        settleDate
      )
    ) {
      //this.errorHandlerService.errorMessage('Settlement date cannot be less then or equal to due date.')
      this.spDueDateError =
        "Settlement date cannot be less then or equal to due date.";
    } else if (
      !this.dateFormatService.checkDateGreaterEqual(settleDate, new Date())
    ) {
      //this.errorHandlerService.errorMessage('Settlement date cannot be greater then today date.')
      this.spDueDateError =
        "Settlement date cannot be greater then today date.";
    } else {
      this.data.settlement_date =
        this.data.settlement_date1.year +
        "/" +
        this.data.settlement_date1.month +
        "/" +
        this.data.settlement_date1.day;
      this.data.settlement_finish = this.data.temp_settlement_finish
        ? "yes"
        : "no";
      this.data.right_off_amount = 0;
      if (
        parseFloat(this.data.settlement_amount) +
          parseFloat(this.data.amount) ==
        parseFloat(this.data.payment_due_amount)
      ) {
        this.data.settlement_finish = "yes";
        this.confirmationDialogService
          .confirm(
            "Please confirm",
            "Do you really you want to settle this payment?"
          )
          .then(confirmed => {
            if (confirmed) {
              this.saveData();
            }
          })
          .catch(() => {});
      } else if (
        this.data.settlement_finish == "yes" &&
        parseFloat(this.data.payment_due_amount) >
          parseFloat(this.data.settlement_amount) + parseFloat(this.data.amount)
      ) {
        let remainAmount = (this.data.right_off_amount =
          parseFloat(this.data.payment_due_amount) -
          (parseFloat(this.data.settlement_amount) +
            parseFloat(this.data.amount)));
        this.confirmationDialogService
          .confirm(
            "Please confirm",
            "Are you sure to write off Rs." + remainAmount + "?"
          )
          .then(confirmed => {
            if (confirmed) {
              this.saveData();
            }
          })
          .catch(() => {});
      } else {
        let remainAmount = (this.data.right_off_amount =
          parseFloat(this.data.payment_due_amount) -
          (parseFloat(this.data.settlement_amount) +
            parseFloat(this.data.amount)));
        this.confirmationDialogService
          .confirm(
            "Please confirm",
            "Are you sure for partial payment of Rs." +
              parseFloat(this.data.amount) +
              "?"
          )
          .then(confirmed => {
            if (confirmed) {
              this.data.settlement_finish = "no";
              this.data.right_off_amount = 0;
              this.saveData();
            } else {
              // this.data.settlement_finish = 'no'
              // this.data.right_off_amount = 0
              //this.saveData()
            }
          })
          .catch(() => {});
      }
    }
  }

  saveData() {
    this.data.login_user_email = this.loginUser.email;
    this.data.login_user_trade_name = this.loginUser.trade_name;
    this.defaulterService
      .settlement(this.data)
      .pipe()
      .subscribe(
        result => {
          this.errorHandlerService.successMessage(
            "Settlement successfully updated"
          );
          this.routerService.RedirectPendingSettlements();
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
  }

  redirectBack() {
    this.routerService.RedirectUserUrl(this.redirectUrl);
  }
}
