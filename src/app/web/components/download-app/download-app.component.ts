import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "src/app/shared/services/common.service";
import { RouterService } from "src/app/shared/services/router.service";
import { PopupType } from "../../../shared/constants/enum";
import { RegistrationComponent } from "../../../web/components/registration/registration.component";
@Component({
  selector: "app-download-app",
  templateUrl: "./download-app.component.html",
  styleUrls: ["./download-app.component.css"]
})
export class DownloadAppComponent implements OnInit {
  public androidUrl = "";
  public iosUrl = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private routerService: RouterService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let code =
        params.code != null && params.code !== undefined ? params.code : "";
      let myObj = { refferalCode: code };
      sessionStorage.setItem("refferalCode", JSON.stringify(myObj));
    });
  }
  //Open sign up Popup
  openRegistration() {
    this.commonService.openPopup(RegistrationComponent, "SignUp");
  }
}
