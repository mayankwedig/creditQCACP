import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpService } from "../../shared/services/http.service";
import { Observable, BehaviorSubject } from "node_modules/rxjs";
import { Response } from "../../shared/models/response";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly apiAuthBaseUrl =
    environment.services.gatewayUrl +
    environment.services.authorization.baseUrl;
  private readonly apiDashboardBaseUrl =
    environment.services.gatewayUrl + environment.services.dashboard.baseUrl;
  private readonly apiCustomerBaseUrl =
    environment.services.gatewayUrl + environment.services.user.baseUrl;
  private readonly apiBankBaseUrl =
    environment.services.gatewayUrl + environment.services.userBank.baseUrl;

  private readonly apiFileBaseUrl = environment.services.files.baseUrl;

  constructor(private httpService: HttpService) {}

  //login
  public login(loginDetails): Observable<Response> {
    const url = environment.services.authorization.api.postLogin;
    return this.httpService.post<Response>(
      this.apiAuthBaseUrl,
      url,
      loginDetails
    );
  }

  //login
  public loginCUST(loginDetails): Observable<Response> {
    const url = environment.services.authorization.api.postCUSTLogin;
    return this.httpService.post<Response>(
      this.apiAuthBaseUrl,
      url,
      loginDetails
    );
  }

  //Dashboard
  public dashboard(id): Observable<Response> {
    const url = environment.services.dashboard.api.getDashboard.replace(
      ":id",
      id
    );
    return this.httpService.get<Response>(this.apiDashboardBaseUrl, url);
  }

  //Get Customer by GST No
  public userByGST(data): Observable<Response> {
    const url = environment.services.user.api.postByGSTNo;
    return this.httpService.post<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //Check user defaulter or not
  public checkDefaulter(id): Observable<Response> {
    const url = environment.services.user.api.getCheckDefaulter.replace(
      ":id",
      id
    );
    return this.httpService.get<Response>(this.apiCustomerBaseUrl, url);
  }

  //check Customer's new defaulter
  public checkCustomerNewDefaulter(data): Observable<Response> {
    const url = environment.services.user.api.getCheckCustomerNewDefaulter;
    return this.httpService.post<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //Update user data from registration
  public updateUser(data): Observable<any> {
    const url = environment.services.user.api.putUpdate;
    data["registration_source"] = "website";
    return this.httpService.put<any>(this.apiCustomerBaseUrl, url, data);
  }

  //Update Profile pic
  public updateProfilePic(data): Observable<Response> {
    const url = environment.services.user.api.putProfilePic;
    return this.httpService.put<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //Update Profile pic
  public uploadProfilePic(data): Observable<any> {
    const url = environment.services.files.postImage;
    return this.httpService.post<any>(this.apiFileBaseUrl, url, data);
  }

  //Update Profile pic
  public changePassword(data): Observable<any> {
    const url = environment.services.user.api.putChangePassword;
    return this.httpService.put<any>(this.apiCustomerBaseUrl, url, data);
  }

  //Send OTP
  public sendOTP(data): Observable<Response> {
    const url = environment.services.user.api.postSendOTP;
    return this.httpService.post<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //Verify OTP
  public verifyOTP(data): Observable<Response> {
    const url = environment.services.user.api.postVerifyOTP;
    return this.httpService.post<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //reset Password
  public resetPassword(data): Observable<Response> {
    const url = environment.services.user.api.putResetPassword;
    return this.httpService.put<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //Apply Referral Codes
  public applyReferralCode(data): Observable<Response> {
    const url = environment.services.user.api.postReferralCode;
    return this.httpService.post<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //Apply Executive Codes
  public applyExecutiveCode(code): Observable<Response> {
    const url = environment.services.user.api.getExecutiveCode.replace(
      ":code",
      code
    );
    return this.httpService.get<Response>(this.apiCustomerBaseUrl, url);
  }

  //*****************  start  User banks   **************/

  //Save bank details
  public saveBank(data): Observable<Response> {
    const url = environment.services.userBank.api.postSave;
    return this.httpService.post<Response>(this.apiBankBaseUrl, url, data);
  }

  //Update bank details
  public updateBank(data): Observable<Response> {
    const url = environment.services.userBank.api.putUpdate;
    return this.httpService.put<Response>(this.apiBankBaseUrl, url, data);
  }

  //Get Bank List
  public bankList(data): Observable<Response> {
    const url = environment.services.userBank.api.postList;
    return this.httpService.post<Response>(this.apiBankBaseUrl, url, data);
  }

  //Get Bank by id
  public bankById(id): Observable<Response> {
    const url = environment.services.userBank.api.getById.replace(":id", id);
    return this.httpService.get<Response>(this.apiBankBaseUrl, url);
  }

  //Get Bank by IFSC
  public bankByIFSC(ifsc_code): Observable<Response> {
    const url = environment.services.userBank.api.getByIFSC.replace(
      ":ifsc_code",
      ifsc_code
    );
    return this.httpService.get<Response>(this.apiBankBaseUrl, url);
  }

  public createVisitor(data): Observable<Response> {
    const url = environment.services.user.api.createVisitor;
    return this.httpService.post<Response>(this.apiCustomerBaseUrl, url, data);
  }

  //*****************   end User banks   **************/
}
