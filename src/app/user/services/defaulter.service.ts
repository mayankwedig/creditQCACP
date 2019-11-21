import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Observable, BehaviorSubject } from 'node_modules/rxjs';
import { Response } from '../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class DefaulterService {

  private readonly apiDefaulterBaseUrl = environment.services.gatewayUrl + environment.services.defaulter.baseUrl;
  private readonly apiFileBaseUrl = environment.services.files.baseUrl;
  constructor(private httpService: HttpService) { }

  //Get Defaulter request
  public requesterList(data): Observable<Response> {
    const url = environment.services.defaulter.api.postRequestList;
    return this.httpService.post<Response>(this.apiDefaulterBaseUrl, url, data);
  }

  //check Defaulter status
  public checkStatus(data): Observable<Response> {
    const url = environment.services.defaulter.api.postCheckStatus;
    return this.httpService.post<Response>(this.apiDefaulterBaseUrl, url, data);
  }


  //Create request
  public saveRequest(data): Observable<Response> {
    const url = environment.services.defaulter.api.postSave;
    return this.httpService.post<Response>(this.apiDefaulterBaseUrl, url, data);
  }

  //Delete request
  public deleteRequest(id): Observable<Response> {
    const url = environment.services.defaulter.api.deleteRequest.replace(':id', id);
    return this.httpService.delete<Response>(this.apiDefaulterBaseUrl, url);
  }

  // Remove defaulter documents
  public removeDefaulterDoc(data): Observable<any> {
    const url = environment.services.files.removeDefaulterDoc;
    return this.httpService.post<any>(this.apiFileBaseUrl, url, data);
  }

  //Get by id request
  public getById(id): Observable<Response> {
    const url = environment.services.defaulter.api.getById.replace(':id', id);
    return this.httpService.get<Response>(this.apiDefaulterBaseUrl, url);
  }

  //Update settlement
  public settlement(data): Observable<Response> {
    const url = environment.services.defaulter.api.putSettlement;
    return this.httpService.put<Response>(this.apiDefaulterBaseUrl, url, data);
  }
}