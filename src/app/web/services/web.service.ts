import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Observable, BehaviorSubject } from 'node_modules/rxjs';
import { Response } from '../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private readonly apiFaqBaseUrl = environment.services.gatewayUrl + environment.services.faqs.baseUrl;
  private readonly apiSubscribeBaseUrl = environment.services.gatewayUrl + environment.services.subscribe.baseUrl;
  private readonly apiContactBaseUrl = environment.services.gatewayUrl + environment.services.contact.baseUrl;
  private readonly apiPageBaseUrl = environment.services.gatewayUrl + environment.services.content.baseUrl;

  constructor(private httpService: HttpService) { }

  //Get faq List
  public faqs(data): Observable<Response> {
    const url = environment.services.faqs.api.postList;
    return this.httpService.post<Response>(this.apiFaqBaseUrl, url, data);
  }

  //save Subscriber  email
  public saveSubscriber(data): Observable<Response> {
    const url = environment.services.subscribe.api.postSave;
    return this.httpService.post<Response>(this.apiSubscribeBaseUrl, url, data);
  }

  //Save inquiry / contact us
  public saveQuery(data): Observable<Response> {
    const url = environment.services.contact.api.postSave;
    return this.httpService.post<Response>(this.apiContactBaseUrl, url, data);
  }

  //Get static content
  public pageBySlug(slug): Observable<Response> {
    const url = environment.services.content.api.getBySlug.replace(':slug', slug);
    return this.httpService.get<Response>(this.apiPageBaseUrl, url);
  }


}
