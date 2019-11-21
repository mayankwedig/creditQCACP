import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { CommonService } from "../../../shared/services/common.service";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { SessionStorageService } from "../../../shared/services/session-storage.service";
import { RouterService } from "../../../shared/services/router.service";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { PopupType } from "../../../shared/constants/enum";
import * as $ from "node_modules/jquery";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public href: string = "";
  constructor(
    public authService: AuthService,
    private commonService: CommonService,
    public localStorageService: LocalStorageService,
    public sessionStorageService: SessionStorageService,
    public routerService: RouterService,
    private router: Router
  ) {}

  fileBaseUrl: string =
    environment.services.files.baseUrl +
    environment.services.files.profileImage;
  loginUser: any = {};
  showSupportForm: boolean = false;
  toggalBreaCrumMenu(){
    $(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
    $(".main-menu").toggleClass("active");
    $(".jq_overlay").toggleClass("active");
    $("body").toggleClass("body-overflow");
  }
  toggelClass(){
    $(".custom-dropdown-menu").toggleClass("open");
  }
  ngOnInit() {
      this.sessionStorageService.userDetails.pipe().subscribe(result => {
      //Check user session
      if (this.localStorageService.userDetails) {
        this.loginUser = this.localStorageService.userDetails;
        this.loginUser.avatar =
          this.fileBaseUrl + this.loginUser.id + "/" + this.loginUser.avatar;
      }
    });
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if (scroll >= 50) {
        $(".header-wrap").addClass("shadow");
      } else {
        $(".header-wrap").removeClass("shadow");
      }
    });
    //Check for full size page
    this.router.events.subscribe(val => {
      // see also
      if (val instanceof NavigationEnd) {
        if (val.url.includes("user")) {
          $("body").addClass("account-pages sidebar-page");
          $(".header-wrap").removeClass("fix");
        } else {
          $("body").removeClass("account-pages sidebar-page");
          $(".header-wrap").addClass("fix");
        }
      }
    });
  }

  //Open Login Popup
  openLogin() {
    this.commonService.closePopup();
    this.routerService.RedirectToPopup(PopupType.Login);
  }

  //Open sign up Popup
  openRegistration() {
    this.commonService.closePopup();
    this.routerService.RedirectToPopup(PopupType.SigUp);
  }

  logout() {
    this.sessionStorageService.flushOnLogout();
    this.routerService.RedirectHome();
  }
}
