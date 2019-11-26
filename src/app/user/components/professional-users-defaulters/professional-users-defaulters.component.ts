import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DefaulterService } from "../../services/defaulter.service";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { ErrorHandlerService } from "../../../shared/services/error-handler.service";
import {
  DateFormatEnum,
  StatusEnum,
  SettlementType
} from "../../../shared/constants/enum";
import { DateFormatService } from "../../../shared/services/date-format.service";
import { RouterService } from "../../../shared/services/router.service";
import { ConfirmDialogService } from "../../../shared/services/confirm-dialog.service";
import * as $ from "node_modules/jquery";

@Component({
  selector: "app-professional-users-defaulters",
  templateUrl: "./professional-users-defaulters.component.html",
  styleUrls: ["./professional-users-defaulters.component.css"]
})
export class ProfessionalUsersDefaultersComponent implements OnInit {
  constructor(
    private defaulterService: DefaulterService,
    private localStorageService: LocalStorageService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    private routerService: RouterService,
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmDialogService
  ) {}

  postData: any = {};
  listData: any = [];
  dataFormat = DateFormatEnum;
  statusEnum = StatusEnum;
  isSearch: boolean = false;
  settlementType = SettlementType;

  ngOnInit() {
    //redirect url
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.status) {
        this.postData.status = params.status;
      }
      this.getList();
    });
  }

  loadJS(event) {
    if (
      !$(event.target)
        .parent(".ct-btn")
        .parent(".ct-dropdown")
        .hasClass("open")
    ) {
      $(".ct-dropdown").removeClass("open");
      $(event.target)
        .closest(".ct-dropdown")
        .addClass("open");
    } else {
      $(".ct-dropdown").removeClass("open");
    }
  }

  getList() {
    this.postData.customer_id = this.localStorageService.userDetails.id;
    this.postData["settlement_finish"] = "no";
    this.defaulterService
      .requesterList(this.postData)
      .pipe()
      .subscribe(
        result => {
          if (result != null) {
            this.listData = result.body;
          } else {
            this.errorHandlerService.defaultError();
          }
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
  }

  searchList() {
    if (this.postData.gst_no != "" && this.postData.gst_no != null) {
      this.isSearch = true;
      this.postData.status = "";
      this.getList();
    }
  }

  viewDetail(id: string) {
    let sId = btoa(id);
    this.routerService.RedirectDefaulterDetails(
      sId,
      this.routerService.userMenu.defaulter
    );
  }
  viewDefaultedByDetail(id: string) {
    let sId = btoa(id);
    this.routerService.RedirectDefaultedByDetails(
      sId,
      this.routerService.userMenu.defaultedByDetails
    );
  }
  editDefaulter(id: string) {
    this.defaulterService
      .checkStatus({ defaulter_id: id })
      .pipe()
      .subscribe(
        result => {
          if (
            result.body.status == "pending" ||
            result.body.status == "more_details_required"
          ) {
            let sId = btoa(id);
            this.routerService.RedirectEditDefaulter(sId);
          } else {
            this.errorHandlerService.defaultError();
          }
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
    // let sId = btoa(id)
    // this.routerService.RedirectEditDefaulter(sId)
  }

  cancleDefaulter(id: string) {
    this.confirmationDialogService
      .confirm("Please confirm", "Are you sure you want to cancel?")
      .then(confirmed => {
        if (confirmed) {
          this.defaulterService
            .checkStatus({ defaulter_id: id })
            .pipe()
            .subscribe(
              result => {
                if (result.body.status == "pending") {
                  let formData = new FormData();
                  formData.append("defaulter_id", id);
                  //this.defaulterService.removeDefaulterDoc(formData).pipe().subscribe((result_remove_doc) => {

                  this.defaulterService
                    .deleteRequest(id)
                    .pipe()
                    .subscribe(
                      result => {
                        this.errorHandlerService.successMessage(
                          "Your request has been cancled."
                        );
                        this.getList();
                      },
                      error => {
                        this.errorHandlerService.handleError(error);
                      }
                    );
                  // }, error => {
                  //   this.errorHandlerService.handleError(error)
                  // });
                } else {
                  this.errorHandlerService.defaultError();
                }
              },
              error => {
                this.errorHandlerService.handleError(error);
              }
            );
        }
      })
      .catch(con_error => {
        this.errorHandlerService.handleError(con_error);
      });
  }

  settlement(id: string, type) {
    let sId = btoa(id);
    this.routerService.RedirectPaymentSettlements(sId, type);
  }

  resetSearch() {
    this.isSearch = false;
    this.postData.gst_no = "";
    this.postData.status = "";
    this.getList();
  }
}
