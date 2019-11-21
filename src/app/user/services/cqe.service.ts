import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Observable, BehaviorSubject } from 'node_modules/rxjs';
import { Response } from '../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class CQEService {

  private readonly apiDefaulterBaseUrl = environment.services.gatewayUrl + environment.services.cqe.baseUrl;

  constructor(private httpService: HttpService) { }

  //Get CIBIL Report list
  public requesterList(data): Observable<Response> {
    const url = environment.services.cqe.api.postRequestList;
    return this.httpService.post<Response>(this.apiDefaulterBaseUrl, url, data);
  }

  //Save CIBIL Report list
  public saveRequest(data): Observable<Response> {
    const url = environment.services.cqe.api.postSave;
    return this.httpService.post<Response>(this.apiDefaulterBaseUrl, url, data);
  }


}
