import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Import Rote Components
import { HomeComponent } from "./web/components/home/home.component";
import { AboutComponent } from "./web/components/about/about.component";

import { ContactUsComponent } from "./web/components/contact-us/contact-us.component";
import { HelpComponent } from "./web/components/help/help.component";
import { SolutionComponent } from "./web/components/solution/solution.component";
import { ContentPageComponent } from "./web/components/content-page/content-page.component";

import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { AuthGuard } from "./guards/auth-guard.service";

//user routing
import { DashboardComponent } from "./user/components/dashboard/dashboard.component";
import { ProfileComponent } from "./user/components/profile/profile.component";
import { ChangePasswordComponent } from "./user/components/profile/change-password/change-password.component";

import { InvoiceComponent } from "./user/components/invoice/invoice.component";
import { InvoiceDetailComponent } from "./user/components/invoice/invoice-detail/invoice-detail.component";

import { DefaulterComponent } from "./user/components/defaulter/defaulter.component";
import { UploadDefaulterComponent } from "./user/components/defaulter/upload-defaulter/upload-defaulter.component";
import { DefaulterDetailComponent } from "./user/components/defaulter/defaulter-detail/defaulter-detail.component";

import { SettlementComponent } from "./user/components/settlement/settlement.component";
import { SettlePaymentComponent } from "./user/components/settlement/settle-payment/settle-payment.component";
import { PendingSettlementComponent } from "./user/components/settlement/pending-settlement/pending-settlement.component";

import { CQEReportComponent } from "./user/components/cqe-report/cqe-report.component";
import { RequestReportComponent } from "./user/components/cqe-report/request-report/request-report.component";
import { PaymentSuccessComponent } from "./web/components/payment-success/payment-success.component";
import { PaymentFailComponent } from "./web/components/payment-fail/payment-fail.component";
import { DownloadAppComponent } from "./web/components/download-app/download-app.component";
import { MembershipComponent } from "./web/components/membership/membership.component";
import { AboutDefaulterComponent } from "./web/components/about-defaulter/about-defaulter.component";
import { AboutSettlePaymentComponent } from "./web/components/about-settle-payment/about-settle-payment.component";
import { AboutCreditReportComponent } from "./web/components/about-credit-report/about-credit-report.component";
import { AppHomeComponent } from "./web/components/app-home/app-home.component";
import { GalleryComponent } from "./web/components/gallery/gallery.component";
import { TestimonialsComponent } from "./web/components/testimonials/testimonials.component";
import { CareerComponent } from "./web/components/career/career.component";
import { BlogComponent } from "./web/components/blog/blog.component";
import { ProfessionalDashboardComponent } from "./user/components/dashboard/professional-dashboard/professional-dashboard.component";
import { ProfessionalUsersComponent } from "./user/components/professional-users/professional-users.component";
import { ProfessionalUsersDedefaultersComponent } from "./user/components/professional-users-dedefaulters/professional-users-dedefaulters.component";

const routes: Routes = [
  //Web routing
  {
    path: "",
    component: HomeComponent,
    data: { title: "CreditQ – Aapke Vyapaar Ka Chaukidaar" }
  },
  {
    path: "app-home",
    component: AppHomeComponent,
    data: { title: "CreditQ – Aapke Vyapaar Ka Chaukidaar" }
  },
  {
    path: "home/:id",
    component: HomeComponent,
    data: { title: "CreditQ – Aapke Vyapaar Ka Chaukidaar" }
  },
  {
    path: "about-us",
    component: AboutComponent,
    data: { title: "About Us | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "about-us",
    component: AboutComponent,
    data: { title: "About Us | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
    data: { title: "Contact Us | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "solution",
    component: SolutionComponent,
    data: { title: "Solution Us | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "help",
    component: HelpComponent,
    data: { title: "Help | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "privacy-policy",
    component: ContentPageComponent,
    data: { title: "Privacy Policy | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "terms-and-Conditions",
    component: ContentPageComponent,
    data: { title: "Terms & Conditions | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "refund-policy",
    component: ContentPageComponent,
    data: { title: "Refund Policy | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "ap",
    component: DownloadAppComponent,
    data: { title: "Download App | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "payment-success",
    component: PaymentSuccessComponent,
    data: { title: "Payment Success | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "payment-failer",
    component: PaymentFailComponent,
    data: { title: "Payment Failed | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "membership-plan",
    component: MembershipComponent,
    data: { title: "Membership | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "about-defualter",
    component: AboutDefaulterComponent,
    data: { title: "About Defaulter | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "about-settle-payment",
    component: AboutSettlePaymentComponent,
    data: { title: "About Settle Payment | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "about-credit-report",
    component: AboutCreditReportComponent,
    data: { title: "About Credit Report | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "gallery",
    component: GalleryComponent,
    data: { title: "Gallery | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "testimonials",
    component: TestimonialsComponent,
    data: { title: "Testimonials | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "career",
    component: CareerComponent,
    data: { title: "Career | CreditQ" },
    pathMatch: "full"
  },
  {
    path: "blog",
    component: BlogComponent,
    data: { title: "Blog | CreditQ" },
    pathMatch: "full"
  },
  //User routing
  {
    path: "user/dashboard",
    component: DashboardComponent,
    data: { title: "Dashboard | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/profile",
    component: ProfileComponent,
    data: { title: "Profile | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/change-password",
    component: ChangePasswordComponent,
    data: { title: "Change password | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },

  {
    path: "user/invoice",
    component: InvoiceComponent,
    data: { title: "Invoice | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/invoice-detail/:id",
    component: InvoiceDetailComponent,
    data: { title: "Invoice Details | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },

  {
    path: "user/defaulter",
    component: DefaulterComponent,
    data: { title: "Defaulter | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/upload-defaulter",
    component: UploadDefaulterComponent,
    data: { title: "Add Defaulter | CreditQ", header: "Add" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/edit-defaulter/:id",
    component: UploadDefaulterComponent,
    data: { title: "Edit Defaulter | CreditQ", header: "Edit" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/defaulter-details/:id",
    component: DefaulterDetailComponent,
    data: { title: "Defaulter Details | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },

  {
    path: "user/settlements",
    component: SettlementComponent,
    data: { title: "Settlement history | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/pending-settlement",
    component: PendingSettlementComponent,
    data: { title: "Pending Settlements | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/settle-payment/:id",
    component: SettlePaymentComponent,
    data: { title: "Payment Settlement | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },

  {
    path: "user/cir-report",
    component: CQEReportComponent,
    data: { title: "CIBIL Reports | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/cir-request",
    component: RequestReportComponent,
    data: { title: "Request CIBIL Reports | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/professional/professional-dashboard",
    component: ProfessionalDashboardComponent,
    data: { title: "Professional | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/professional/professional-users",
    component: ProfessionalUsersComponent,
    data: { title: "Professional Users | CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "user/professional/professional-users/defaulters",
    component: ProfessionalUsersDedefaultersComponent,
    data: { title: "Professional Users defaulters| CreditQ" },
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  //All route redirect if not found
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
