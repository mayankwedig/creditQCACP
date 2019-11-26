import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-professional-dashboard",
  templateUrl: "./professional-dashboard.component.html",
  styleUrls: ["./professional-dashboard.component.css"]
})
export class ProfessionalDashboardComponent implements OnInit {
  isSearch = false;
  postData = {
    gst_no: "",
    payment_due_date: ""
  };
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
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute("src", this.selectedUrl);
  }
  playSelectedVideo(key) {
    this.selectedUrl =
      this.getVideoUrl(this.youtubeVideos[key].vidoeId) + "?autoplay=1&rel=1";
    this.iframe.nativeElement.setAttribute("src", this.selectedUrl);
  }
}
