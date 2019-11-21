import { Component, HostListener } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CreditQ";
  public isUserMenu = false;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  isAppHome: boolean = false;
  ngOnInit() {
    let currentUrl = window.location.href; //"https://creditq.in/app-home"; //window.location.href;
    let currentUrlArr = currentUrl.split("/");
    if (currentUrlArr[3] === "app-home") {
      this.isAppHome = true;
    } else {
      this.isAppHome = false;
    }
    window.addEventListener("storage", function(e) {
      var confirmationMessage = "o/";
      console.log("cond"); // Gecko, WebKit, Chrome <34
    });
  }
}
