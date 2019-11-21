import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ElementRef, Injectable } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./web/components/home/home.component";
import { AboutComponent } from "./web/components/about/about.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { NavMenuComponent } from "./core/components/nav-menu/nav-menu.component";
import { DashboardComponent } from "./user/components/dashboard/dashboard.component";
import { SideMenuComponent } from "./user/components/side-menu/side-menu.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { LoginComponent } from "./web/components/login/login.component";
import { RegistrationComponent } from "./web/components/registration/registration.component";
import { JwtModule, JwtModuleOptions } from "@auth0/angular-jwt";
import { LocalStorageService } from "./shared/services/local-storage.service";
import {
  NgbModalConfig,
  NgbModal,
  NgbModule,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { ForgotPasswordComponent } from "./web/components/forgot-password/forgot-password.component";
import { ModalComponent } from "./core/components/modal/modal.component";
import { FormsModule } from "@angular/forms";
import { TokenInterceptor } from "./shared/interceptors/token.interceptor";
import { HttpService } from "./shared/services/http.service";
import { UserService } from "./user/services/user.service";
import { SessionStorageService } from "./shared/services/session-storage.service";
import { ProfileComponent } from "./user/components/profile/profile.component";
import { InvoiceComponent } from "./user/components/invoice/invoice.component";
import { DefaulterComponent } from "./user/components/defaulter/defaulter.component";
import { UploadDefaulterComponent } from "./user/components/defaulter/upload-defaulter/upload-defaulter.component";
import { InvoiceDetailComponent } from "./user/components/invoice/invoice-detail/invoice-detail.component";
import { SettlementComponent } from "./user/components/settlement/settlement.component";
import { SettlePaymentComponent } from "./user/components/settlement/settle-payment/settle-payment.component";
import { NgHttpLoaderModule } from "ng-http-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { CQEReportComponent } from "./user/components/cqe-report/cqe-report.component";
import { RequestReportComponent } from "./user/components/cqe-report/request-report/request-report.component";
import { NoRecordComponent } from "./core/components/no-record/no-record.component";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { DateParserFormaterService } from "./shared/services/date-parser-formater.service";
import { ContactUsComponent } from "./web/components/contact-us/contact-us.component";
import { HelpComponent } from "./web/components/help/help.component";
import { SolutionComponent } from "./web/components/solution/solution.component";
import { ContentPageComponent } from "./web/components/content-page/content-page.component";
import { DefaulterDetailComponent } from "./user/components/defaulter/defaulter-detail/defaulter-detail.component";
import { PendingSettlementComponent } from "./user/components/settlement/pending-settlement/pending-settlement.component";
//import { DigitOnlyModule } from '@uiowa/digit-only';
import { DigitOnlyDirective } from "./shared/directive/digit-only.directive";
import { ChangePasswordComponent } from "./user/components/profile/change-password/change-password.component";
import { PaymentSuccessComponent } from "./web/components/payment-success/payment-success.component";
import { ConfirmDialogComponent } from "./core/components/confirm-dialog/confirm-dialog.component";
import { ConfirmDialogService } from "./shared/services/confirm-dialog.service";
import {
  RemoveUnderscorePipe,
  TruncatePipe
} from "../app/shared/services/pipes";
import { SupportFormComponent } from "./core/components/support-form/support-form.component";
import { PaymentFailComponent } from "./web/components/payment-fail/payment-fail.component";
import { DownloadAppComponent } from "./web/components/download-app/download-app.component";
import { MembershipComponent } from "./web/components/membership/membership.component";
import { AboutDefaulterComponent } from "./web/components/about-defaulter/about-defaulter.component";
import { AboutSettlePaymentComponent } from "./web/components/about-settle-payment/about-settle-payment.component";
import { AboutCreditReportComponent } from "./web/components/about-credit-report/about-credit-report.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { AppHomeComponent } from './web/components/app-home/app-home.component';
import { GalleryComponent } from './web/components/gallery/gallery.component';
import { TestimonialsComponent } from './web/components/testimonials/testimonials.component';
import { CareerComponent } from './web/components/career/career.component';
import { BlogComponent } from './web/components/blog/blog.component';
import { ProfessionalDashboardComponent } from './user/components/dashboard/professional-dashboard/professional-dashboard.component';
import { ProfessionalUsersComponent } from './user/components/professional-users/professional-users.component';
import { ProfessionalUsersDedefaultersComponent } from './user/components/professional-users-dedefaulters/professional-users-dedefaulters.component';
export function tokenGetter() {
  return localStorage.getItem("auth_token");
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter
  }
};

@NgModule({
  declarations: [
    AppComponent,
    RemoveUnderscorePipe,
    TruncatePipe,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    NavMenuComponent,
    DashboardComponent,
    SideMenuComponent,
    NotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ModalComponent,
    ProfileComponent,
    InvoiceComponent,
    DefaulterComponent,
    UploadDefaulterComponent,
    InvoiceDetailComponent,
    SettlementComponent,
    SettlePaymentComponent,
    CQEReportComponent,
    RequestReportComponent,
    NoRecordComponent,
    ContactUsComponent,
    HelpComponent,
    SolutionComponent,
    ContentPageComponent,
    DefaulterDetailComponent,
    PendingSettlementComponent,
    DigitOnlyDirective,
    ChangePasswordComponent,
    PaymentSuccessComponent,
    ConfirmDialogComponent,
    SupportFormComponent,
    PaymentFailComponent,
    DownloadAppComponent,
    MembershipComponent,
    AboutDefaulterComponent,
    AboutSettlePaymentComponent,
    AboutCreditReportComponent,
    AppHomeComponent,
    GalleryComponent,
    TestimonialsComponent,
    CareerComponent,
    BlogComponent,
    ProfessionalDashboardComponent,
    ProfessionalUsersComponent,
    ProfessionalUsersDedefaultersComponent
  ],

  entryComponents: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    PaymentSuccessComponent,
    ConfirmDialogComponent
  ],

  imports: [
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    JwtModule.forRoot(JWT_Module_Options),
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    // DigitOnlyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: NgbDateParserFormatter, useClass: DateParserFormaterService },
    LocalStorageService,
    SessionStorageService,
    NgbModalConfig,
    NgbModal,
    NgbActiveModal,
    HttpService,
    UserService,
    ConfirmDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
