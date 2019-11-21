import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoginComponent } from "../../../web/components/login/login.component";
import { RegistrationComponent } from "../../../web/components/registration/registration.component";
import { ForgotPasswordComponent } from "../../../web/components/forgot-password/forgot-password.component";
import { CommonService } from "../../../shared/services/common.service";
import { RouterService } from "../../../shared/services/router.service";
import { PopupType } from "../../../shared/constants/enum";
import { UserService } from "../../../user/services/user.service";
import { IpServiceService } from "../../../ip-service.service";
import { Title } from "@angular/platform-browser";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    margin: 0,
    items: 1,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };
  testiMoOptions: OwlOptions = {
    loop: true,
    margin: 0,
    items: 1,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };
  slidesStore: any = [
    {
      id: "s1",
      src: "assets/img/banner-img1.jpg",
      title: "Slide1",
      alt: "Slide 1 image",
      txt_heading: "Membership",
      txt_slug: "membership",
      txt_content:
        "Join CreditQ as a member and stay ahead from others. This way you not only save your money, but cut down your debts and other financial hassles."
    },
    {
      id: "s2",
      src: "assets/img/banner-img2.png",
      title: "Slide1",
      alt: "Slide 1 image",
      txt_heading: "Add Defaulter",
      txt_slug: "add_defaulter",
      txt_content:
        "Adding a defaulter is very easy and complete free for the CreditQ member. Defaulter will be exposed all over india as the credit information & Defaulter list would be available all the members across the india."
    },
    {
      id: "s3",
      src: "assets/img/banner-img3.jpg",
      title: "Slide2",
      alt: "Slide 2 image",
      txt_heading: "Settle Payment",
      txt_slug: "settle_payment",
      txt_content:
        "Both the concerned parties and registered member MSME and defaulter can agree to settle their disputes over the payment."
    },
    {
      id: "s4",
      src: "assets/img/banner-img4.jpg",
      title: "Slide3",
      alt: "Slide 3 image",
      txt_heading: "Credit Information Report",
      txt_slug: "credit_information_report",
      txt_content:
        "CreditQ is an online platform where MSMEs and businesses enroll themselves and seek information about their business and clients before entering into a business deal."
    }
  ];
  contentToShowArray: any = [
    { sectionName: "memeberShip", memeberShip: true },
    { sectionName: "addDefaulter", addDefaulter: false },
    { sectionName: "cir", cir: false },
    { sectionName: "settlePaymet", settlePaymet: false }
  ];
  showContentOnClick(value) {
    this.contentToShowArray = [
      { sectionName: "memeberShip", memeberShip: false },
      { sectionName: "addDefaulter", addDefaulter: false },
      { sectionName: "cir", cir: false },
      { sectionName: "settlePaymet", settlePaymet: false }
    ];
    this.contentToShowArray.forEach(element => {
      if (element["sectionName"] === value) {
        element[value] = true;
      } else {
        element[value] = false;
      }
    });
  }
  public membership_tab =
    "Join CreditQ as member and stay ahead of others. By joining CreditQ as a member you not only save a lot of money but you also cut down your debts and other hassles.";
  public add_defaulter_tab =
    "Adding a defaulter is very easy and completely free for CreditQ registered members.";
  public credit_report_tab =
    "CreditQis a platform where MSMEs and businesses enroll themselves and seek information about other businesses and clients before entering into a business deal.";
  public settle_payment_tab =
    "CreditQ lists defaulters identified and added by the registered members.";

  constructor(
    public route: RouterService,
    private activatedRoute: ActivatedRoute,
    public routerService: RouterService,
    private commonService: CommonService,
    private userService: UserService,
    private ip: IpServiceService,
    private titleService: Title
  ) {
    this.activatedRoute.data.subscribe(params => {
      //this.header = params.title
      this.titleService.setTitle(params.title);
    });
  }
  user_ip_address: String = "";
  ngOnInit() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.user_ip_address = res.ip;
      this.userService
        .createVisitor(this.user_ip_address)
        .pipe()
        .subscribe(result => {}, error => {});
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params) {
          if (params.id == PopupType.Login) {
            this.commonService.openPopup(LoginComponent, "Login");
          } else if (params.id == PopupType.SigUp) {
            this.commonService.openPopup(RegistrationComponent, "SignUp");
          } else if (params.id == PopupType.ForgotPassword) {
            this.commonService.openPopup(
              ForgotPasswordComponent,
              "Forgot Password"
            );
          }
        }
      });
    });
  }
}