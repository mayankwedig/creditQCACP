import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpService } from "../../shared/services/http.service";
import { Observable, BehaviorSubject } from "node_modules/rxjs";
import { Response } from "../../shared/models/response";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  private readonly apiPaymentBaseUrl =
    environment.services.gatewayUrl + environment.services.payment.baseUrl;
  private readonly apiPaytmBaseUrl =
    environment.services.gatewayUrl + environment.services.paytm.baseUrl;
  private readonly apiPromoBaseUrl =
    environment.services.gatewayUrl + environment.services.promoCode.baseUrl;

  constructor(private httpService: HttpService) {}

  //Get payment list
  public list(data): Observable<Response> {
    const url = environment.services.payment.api.postList;
    return this.httpService.post<Response>(this.apiPaymentBaseUrl, url, data);
  }

  //Create payment
  public save(data): Observable<Response> {
    const url = environment.services.payment.api.postSave;
    return this.httpService.post<Response>(this.apiPaymentBaseUrl, url, data);
  }

  //Get by id payment
  public getById(id): Observable<Response> {
    const url = environment.services.payment.api.getById.replace(":id", id);
    return this.httpService.get<Response>(this.apiPaymentBaseUrl, url);
  }

  //Update payments
  public update(data): Observable<Response> {
    const url = environment.services.payment.api.putUpdate;
    data["registration_source"] = "website";
    return this.httpService.put<Response>(this.apiPaymentBaseUrl, url, data);
  }

  //Generate checksum
  public generateChecksum(data): Observable<Response> {
    const url = environment.services.paytm.api.postChecksum;
    return this.httpService.post<Response>(this.apiPaytmBaseUrl, url, data);
  }

  //Verify Checksum
  public verifyChecksum(data): Observable<Response> {
    const url = environment.services.paytm.api.postVerifyChecksum;
    return this.httpService.post<Response>(this.apiPaytmBaseUrl, url, data);
  }

  //Verify Checksum
  public applyPromoCode(data): Observable<Response> {
    const url = environment.services.promoCode.api.postApplyPromo;
    return this.httpService.post<Response>(this.apiPromoBaseUrl, url, data);
  }
}
