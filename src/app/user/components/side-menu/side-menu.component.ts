import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { SessionStorageService } from "../../../shared/services/session-storage.service";
import { RouterService } from "../../../shared/services/router.service";
import { environment } from "../../../../environments/environment";
import { MasterService } from "../../../user/services/master.service";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as $ from "jquery";
declare var require: any;
//am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.css"]
})
export class SideMenuComponent implements OnInit {
  public userTypes = "professional";
  constructor(
    public localStorageService: LocalStorageService,
    public sessionStorageService: SessionStorageService,
    public routerService: RouterService,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private masterService: MasterService
  ) {}
  private chart: am4charts.XYChart;

  ngAfterViewInit() {
    this.getSetting();
  }

  fileBaseUrl: string =
    environment.services.files.baseUrl +
    environment.services.files.profileImage;
  loginUser: any = {};

  dashboard: string = "";
  invoice: string = "";
  profile: string = "";
  invoiceDetail: string = "";
  defaulter: string = "";
  uploadDefaulter: string = "";
  settlements: string = "";
  settlePayment: string = "";
  defaulterMain: string = "";
  settleMain: string = "";
  cibilMain: string = "";
  cibilReport: string = "";
  requestCibilReport: string = "";
  maxCQEScore: number = 900;
  userCQEScore: number = 0;

  ngOnInit() {
    //Add active Class
    this.showSelectedMenu();
    if (this.localStorageService.userDetails) {
      this.sessionStorageService.userDetails.subscribe(result => {
        //Check user session
        if (this.localStorageService.userDetails) {
          this.loginUser = this.localStorageService.userDetails;
          this.loginUser.avatar =
            this.fileBaseUrl + this.loginUser.id + "/" + this.loginUser.avatar;
          this.userCQEScore = this.loginUser.credit_score;
        }
      });
    }
    $(document).ready(function() {
      $(".jq_sidebar_menu").click(function() {
        $(this).toggleClass(
          "mobile-inner-header-icon-click mobile-inner-header-icon-out"
        );
        $(".sidebar").toggleClass("active");
        $(".jq_overlay_sidebar").toggleClass("active");
        $("body").toggleClass("body-overflow");
        $(".main-menu").removeClass("active");
        $(".jq_overlay").removeClass("active");
      });
      $(".jq_overlay_sidebar").click(function() {
        $(".jq_sidebar_menu").toggleClass(
          "mobile-inner-header-icon-click mobile-inner-header-icon-out"
        );
        $(".sidebar").removeClass("active");
        $(".jq_overlay_sidebar").removeClass("active");
        $("body").removeClass("body-overflow");
      });

      $(".jq_drop_m").click(function() {
        $(this)
          .closest(".dropdown")
          .toggleClass("open");
      });
      $(".jq_s_menu").click(function() {
        $("body").removeClass("body-overflow");
      });
    });
    //load menu js
    this.loadJQuery();
  }

  logout() {
    this.sessionStorageService.flushOnLogout();
    this.routerService.RedirectHome();
  }

  getSetting() {
    this.masterService
      .setting()
      .pipe()
      .subscribe(
        result => {
          this.maxCQEScore = result.body.credit_score;
          //this.loadScoreGraph()
        },
        error => {
          //this.loadScoreGraph()
        }
      );
  }

  loadScoreGraph() {
    this.zone.runOutsideAngular(() => {
      // create chart
      let chart = am4core.create("chartdiv", am4charts.GaugeChart);
      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
      //chart.hideCredits = true,

      chart.innerRadius = -25;
      let axisValue = new am4charts.ValueAxis<am4charts.AxisRendererCircular>();
      let axis = chart.xAxes.push(axisValue);
      axis.min = 0;
      axis.max = this.maxCQEScore;
      axis.strictMinMax = true;
      axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
        "background"
      );
      axis.renderer.grid.template.strokeOpacity = 1;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.disabled = true;

      let labelValue = Math.round(this.maxCQEScore / 5);

      var label = chart.radarContainer.createChild(am4core.Label);
      label.isMeasured = false;
      label.fontSize = 10;
      label.horizontalCenter = "middle";
      label.verticalCenter = "bottom";
      label.text = this.loginUser.credit_score;
      label.stroke = am4core.color("#fff");

      let range0 = axis.axisRanges.create();
      range0.value = 0;
      range0.endValue = labelValue;
      range0.axisFill.fillOpacity = 1;
      range0.axisFill.fill = am4core.color("#ae4040");
      range0.axisFill.zIndex = -1;
      range0.text = "Very Poor";
      // range0.name = "Very Poor";

      let range1 = axis.axisRanges.create();
      range1.value = labelValue;
      range1.endValue = labelValue * 2;
      range1.axisFill.fillOpacity = 1;
      range1.axisFill.fill = am4core.color("#f85325");
      range1.axisFill.zIndex = -1;
      // range1.name = "Poor";

      let range2 = axis.axisRanges.create();
      range2.value = labelValue * 2;
      range2.endValue = labelValue * 3;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color("#f9af1a");
      range2.axisFill.zIndex = -1;
      // range2.name = "Fair";

      let range3 = axis.axisRanges.create();
      range3.value = labelValue * 3;
      range3.endValue = labelValue * 4;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = am4core.color("#cab028");
      range3.axisFill.zIndex = -1;
      // range3.name = "Good";

      let range4 = axis.axisRanges.create();
      range4.value = labelValue * 4;
      range4.endValue =
        labelValue * 5 == this.maxCQEScore ? labelValue * 5 : this.maxCQEScore;
      range4.axisFill.fillOpacity = 1;
      range4.axisFill.fill = am4core.color("#4bb02e");
      range4.axisFill.zIndex = -1;
      //range4.name = "Excellent";

      let hand = chart.hands.push(new am4charts.ClockHand());
      //hand.showValue(this.userCQEScore)
      hand.value = Number(this.userCQEScore);
      $("g[aria-labelledby]").hide();
    });
  }

  loadJQuery() {}

  showSelectedMenu() {
    this.dashboard = "";
    this.invoice = "";
    this.profile = "";
    this.invoiceDetail = "";
    this.defaulterMain = "";
    this.defaulter = "";
    this.uploadDefaulter = "";
    this.settleMain = "";
    this.settlements = "";
    this.settlePayment = "";

    this.cibilMain = "";
    this.cibilReport = "";
    this.requestCibilReport = "";

    this.activatedRoute.url.subscribe(r => {
      if (r.length > 1) {
        this.addClass(r[1].path);
      } else if (r.length > 0) {
        this.addClass(r[0].path);
      }
    });
  }

  addClass(path) {
    switch (path) {
      case this.routerService.userMenu.dashboard:
        this.dashboard = "active";
        break;

      case this.routerService.userMenu.invoice:
        this.invoice = "active";
        break;
      case this.routerService.userMenu.invoiceDetail:
        this.invoice = "active";
        break;

      case this.routerService.userMenu.profile:
        this.profile = "active";
        break;

      case this.routerService.userMenu.defaulter:
        this.defaulterMain = "active open";
        this.defaulter = "active";
        break;

      case this.routerService.userMenu.defaulterDetails:
        this.defaulterMain = "active open";
        this.defaulter = "active";
        break;
      case this.routerService.userMenu.uploadDefaulter:
        this.defaulterMain = "active open";
        this.uploadDefaulter = "active";
        break;
      case this.routerService.userMenu.editDefaulter:
        this.defaulterMain = "active open";
        this.uploadDefaulter = "active";
        break;

      case this.routerService.userMenu.settlements:
        this.settleMain = "active open";
        this.settlements = "active";
        break;
      case this.routerService.userMenu.settlePayment:
        this.settleMain = "active open";
        this.settlePayment = "active";
        break;
      case this.routerService.userMenu.pendingSettlement:
        this.settleMain = "active open";
        this.settlePayment = "active";
        break;

      case this.routerService.userMenu.settlePayment:
        this.settleMain = "active open";
        this.settlePayment = "active";
        break;

      case this.routerService.userMenu.cibilReport:
        this.cibilMain = "active open";
        this.cibilReport = "active";
        break;
      case this.routerService.userMenu.requestCibilReport:
        this.cibilMain = "active open";
        this.requestCibilReport = "active";
        break;
    }
  }
}
