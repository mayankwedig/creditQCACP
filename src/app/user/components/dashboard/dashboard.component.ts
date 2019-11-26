import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { finalize } from "node_modules/rxjs/operators";
import { ErrorHandlerService } from "../../../shared/services/error-handler.service";
import { RouterService } from "../../../shared/services/router.service";
import { StatusEnum } from "../../../shared/constants/enum";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  getVideoUrl(youTubeId) {
    var url = "https://www.youtube.com/embed/";
    if (youTubeId != "") {
      url = url + youTubeId;
    }
    return url;
  }
  public youtubeVideos = [
    {
      vidoeId: "Z5ZqEyTQauY",
      title: "How to become a member. Member registration process",
      thumbImage: "singup-page-thumb.png"
    },
    {
      vidoeId: "fvYLZpRJl_I",
      title: "How to add a defaulter",
      thumbImage: "add-defaulter-thumb.png"
    },
    {
      vidoeId: "EbDzrB9HwOg",
      title: "How to generate CIR (Credit Information Report)",
      thumbImage: "request-cir-thumb.png"
    },
    {
      vidoeId: "XPe5rY7VqmA",
      title: "How to refer",
      thumbImage: "referrer-thumb.png"
    }
  ];
  @ViewChild("iframe") iframe: ElementRef;
  public selectedUrl =
    this.getVideoUrl(this.youtubeVideos[0].vidoeId) + "?&rel=1";
  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute("src", this.selectedUrl);
  }
  playSelectedVideo(key) {
    this.selectedUrl =
      this.getVideoUrl(this.youtubeVideos[key].vidoeId) + "?autoplay=1&rel=1";
    this.iframe.nativeElement.setAttribute("src", this.selectedUrl);
  }
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private spinner: SpinnerVisibilityService,
    private errorHandlerService: ErrorHandlerService,
    private routerService: RouterService,
    public sanitizer: DomSanitizer
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
