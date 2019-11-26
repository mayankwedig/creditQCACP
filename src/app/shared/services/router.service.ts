import { Injectable } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root"
})
export class RouterService {
  private readonly extras: NavigationExtras = { skipLocationChange: true };
  constructor(private router: Router, private commonService: CommonService) {}

  public readonly userMenu: any = {
    dashboard: "dashboard",
    invoice: "invoice",
    profile: "profile",
    invoiceDetail: "invoice-detail",
    defaulter: "defaulter",
    uploadDefaulter: "upload-defaulter",
    editDefaulter: "edit-defaulter",
    defaulterDetails: "defaulter-details",
    settlements: "settlements",
    settlePayment: "settle-payment",
    cibilReport: "cir-report",
    requestCibilReport: "cir-request",
    pendingSettlement: "pending-settlement",
    changePassword: "change-password",
    membershipPlan: "membership-plan",
    aboutDefualter: "about-defualter",
    aboutSettlePayment: "about-settle-payment",
    aboutCreditReport: "about-credit-report",
    defaultedByDetails: "professional/professional-users/defaulters"
  };

  public RedirectDashboard() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.commonService.removeFixHeaderFromInnerPages();
    this.router.navigate(["/user/dashboard"], { skipLocationChange: false });
  }
  public RedirectMembershipPlan() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/membership-plan"], { skipLocationChange: false });
  }
  public RedirectAboutDefualter() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/about-defualter"], { skipLocationChange: false });
  }
  public RedirectAboutSettlePayment() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/about-settle-payment"], {
      skipLocationChange: false
    });
  }
  public RedirectGallery() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/gallery"], {
      skipLocationChange: false
    });
  }
  public RedirectTestimonials() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/testimonials"], {
      skipLocationChange: false
    });
  }
  public RedirectCareer() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/career"], {
      skipLocationChange: false
    });
  }
  public RedirectBlog() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/blog"], {
      skipLocationChange: false
    });
  }
  public RedirectAboutCreditReport() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/about-credit-report"], {
      skipLocationChange: false
    });
  }
  public RedirectProfile() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.commonService.removeFixHeaderFromInnerPages();
    this.router.navigate(["/user/profile"], { skipLocationChange: false });
  }

  public RedirectChangePassword() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.commonService.removeFixHeaderFromInnerPages();
    this.router.navigate(["/user/change-password"], {
      skipLocationChange: false
    });
  }

  public RedirectInvoice() {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/invoice"], { skipLocationChange: false });
  }

  public RedirectInvoiceDetail(id) {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/invoice-detail", id], {
      skipLocationChange: false
    });
  }

  public RedirectDefaulter(filterData = {}) {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/defaulter"], {
      queryParams: filterData,
      skipLocationChange: false
    });
  }

  public RedirectUploadDefaulter() {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/upload-defaulter"], {
      skipLocationChange: false
    });
  }

  public RedirectEditDefaulter(id) {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/edit-defaulter", id], {
      skipLocationChange: false
    });
  }

  public RedirectDefaulterDetails(id, redirectUrl) {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/defaulter-details", id], {
      queryParams: { redirect: redirectUrl },
      skipLocationChange: false
    });
  }
  public RedirectDefaultedByDetails(id, redirectUrl) {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(
      [
        "/user/professional/professional-users/defaulters/defaulted-by-details",
        id
      ],
      {
        queryParams: { redirect: redirectUrl },
        skipLocationChange: false
      }
    );
  }
  public RedirectSettlements() {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/settlements"], { skipLocationChange: false });
  }

  public RedirectPaymentSettlements(id, settleType = "full") {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.commonService.removeFixHeaderFromInnerPages();
    this.router.navigate(["/user/settle-payment", id], {
      queryParams: { type: settleType },
      skipLocationChange: false
    });
  }

  public RedirectPendingSettlements() {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/pending-settlement"], {
      skipLocationChange: false
    });
  }

  public RedirectCQEReport() {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/cir-report"], { skipLocationChange: false });
  }

  public RedirectRequestCQEReport() {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/cir-request"], { skipLocationChange: false });
  }

  public RedirectUserUrl(url) {
    this.commonService.removeFixHeaderFromInnerPages();
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/user/" + url], { skipLocationChange: false });
  }

  public readonly commonMenu: any = {
    aboutUs: "about-us",
    contactUs: "contact-us",
    solution: "solution",
    help: "help",
    privacyPolicy: "privacy-policy",
    termsCondition: "terms-and-Conditions",
    refundPolicy: "refund-policy"
  };

  public RedirectHome() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/"], { skipLocationChange: false });
  }

  public RedirectAbout() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/about-us"], { skipLocationChange: false });
  }

  public RedirectContact() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/contact-us"], { skipLocationChange: false });
  }

  public RedirectHelp() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/help"], { skipLocationChange: false });
  }

  public RedirectSolution() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/solution"], { skipLocationChange: false });
  }

  public RedirectPrivacyPolicy() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/privacy-policy"], { skipLocationChange: false });
  }

  public RedirectTNC() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/terms-and-Conditions"], {
      skipLocationChange: false
    });
  }

  public RedirectRNP() {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["/refund-policy"], { skipLocationChange: false });
  }

  public RedirectToPopup(name) {
    this.commonService.smoothScroll();
    this.commonService.hideBreaCrumMenuOnResponsive();
    this.router.navigate(["home/", name], { skipLocationChange: true });
  }
}
