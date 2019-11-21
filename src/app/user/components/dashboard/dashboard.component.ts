import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { finalize } from "node_modules/rxjs/operators";
import { ErrorHandlerService } from "../../../shared/services/error-handler.service";
import { RouterService } from "../../../shared/services/router.service";
import { StatusEnum } from "../../../shared/constants/enum";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private spinner: SpinnerVisibilityService,
    private errorHandlerService: ErrorHandlerService,
    private routerService: RouterService
  ) {}

  public dashboardData: any = {};
  public statusEnum: any = StatusEnum;

  ngOnInit() {
    this.getData();
  }

  //Get Dashboard data
  getData() {
    this.spinner.show();
    this.userService
      .dashboard(this.localStorageService.userDetails.id)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        result => {
          if (result != null) {
            this.dashboardData = result.body;
          } else {
            this.errorHandlerService.defaultError();
          }
        },
        error => {
          this.errorHandlerService.handleError(error);
        }
      );
  }

  //Go to Defaulter list
  redirectToDefaulter(pStatus = "", reditectToPage = "settlement") {
    let data = {
      status: pStatus
    };
    switch (reditectToPage) {
      case "defaulter":
        this.routerService.RedirectDefaulter(data);
        break;
      case "cirRequest":
        this.routerService.RedirectCQEReport();
        break;
      case "settlement":
        this.routerService.RedirectSettlements();
        break;
    }
  }
}
