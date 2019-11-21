import { map, filter, scan } from '../../../../node_modules/rxjs/operators';

import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { pipe } from '../../../../node_modules/@angular/core/src/render3/pipe';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {
	//postAnonymous: <T>(url: string, data: any) => Observable<T>;
	get1: <T>(url: string) => Observable<T>;
	get: <T>(baseUrl: string, secondaryUrl: string) => Observable<T>;
	post1: <T>(url: string, data: any) => Observable<T>;
	post: <T>(url: string, secondaryUrl: string, data: any) => Observable<T>;
	put1: <T>(url: string, data: any) => Observable<T>;
	put: <T>(baseUrl: string, secondaryUrl: string, data: any) => Observable<T>;
	delete1: <T>(url: string, data: any) => Observable<T>;
	delete: <T>(baseUrl: string, secondaryUrl: string) => Observable<T>;
	//decrypt: <T>(data: any) => T;
	//encrypt: <T>(data: T) => string | any;
	getDownload: <T>(baseUrl: string, secondaryUrl: string) => Observable<T>;
	postDownload: <T>(baseUrl: string, secondaryUrl: string, data: any) => Observable<T>;

	constructor(private httpClient: HttpClient) {
		const vm = this;

		vm.get1 = <T>(url: string) => {
			return vm.httpClient.get<T>(url).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.get = <T>(baseUrl: string, secondaryUrl: string) => {
			return vm.httpClient.get<T>(baseUrl + secondaryUrl).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.post1 = <T>(url: string, data: any) => {
			return vm.httpClient.post<T>(url, data).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.post = <T>(baseUrl: string, secondaryUrl: string, data: any) => {
			return vm.httpClient.post<T>(baseUrl + secondaryUrl, data).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.put1 = <T>(url: string, data: any) => {
			return vm.httpClient.put<T>(url, data).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.put = <T>(baseUrl: string, secondaryUrl: string, data: any) => {
			return vm.httpClient.put<T>(baseUrl + secondaryUrl, data).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.delete1 = <T>(url: string) => {
			return vm.httpClient.delete<T>(url).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.delete = <T>(baseUrl: string, secondaryUrl: string) => {
			return vm.httpClient.delete<T>(baseUrl + secondaryUrl).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.getDownload = <T>(baseUrl: string, secondaryUrl: string) => {
			return vm.httpClient.get<T>(baseUrl + secondaryUrl, { responseType: 'blob' as 'json' }).pipe(map((response: T) => {
				return response;
			}));
		};

		vm.postDownload = <T>(baseUrl: string, secondaryUrl: string, data: any) => {
			return vm.httpClient.post<T>(baseUrl + secondaryUrl, data, { responseType: 'blob' as 'json' }).pipe(map((response: T) => {
				return response;
			}));
		};
	}
}
