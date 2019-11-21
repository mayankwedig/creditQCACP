import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Observable, BehaviorSubject } from 'node_modules/rxjs';
import { Response } from '../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private readonly apiMasterBaseUrl = environment.services.gatewayUrl + environment.services.master.baseUrl;

  constructor(private httpService: HttpService) { }

  //Get Business category list
  public category(): Observable<Response> {
    const url = environment.services.master.api.getCategory
    return this.httpService.get<Response>(this.apiMasterBaseUrl, url);
  }

  public support_question(): Observable<Response> {
    const url = environment.services.master.api.getSupportQuestion
    return this.httpService.get<Response>(this.apiMasterBaseUrl, url);
  }
  
  public save_support_question(data): Observable<Response> {
    const url = environment.services.master.api.saveSupportQuestion;
    return this.httpService.post<Response>(this.apiMasterBaseUrl, url, data);
  }

  //Get Setting
  public setting(): Observable<Response> {
    const url = environment.services.master.api.getSetting
    return this.httpService.get<Response>(this.apiMasterBaseUrl, url);
  }

}
