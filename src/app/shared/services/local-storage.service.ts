
import { Injectable } from '../../../../node_modules/@angular/core';
//import { IUser } from '../models/user';

@Injectable()
export class LocalStorageService {
	private readonly _authToken: string = 'auth_token';
	private readonly _userDetails: string = 'user_details';
	constructor() { }

	get authToken(): string {
		if (localStorage.getItem(this._authToken) !== null) {
			return localStorage.getItem(this._authToken);
		}
		return null;
	}
	set authToken(value: string) {
		if (value !== null && value !== '' && value !== undefined) {
			localStorage.setItem(this._authToken, value);
		}
		else {
			if (localStorage.getItem(this._authToken) !== null) {
				localStorage.removeItem(this._authToken);
			}
		}
	}

	get userDetails() {
		if (localStorage.getItem(this._userDetails) !== null) {
			return JSON.parse(localStorage.getItem(this._userDetails));
		}
		return null;
	}

	set userDetails(value: any) {
		if (value !== null && value !== undefined) {
			localStorage.setItem(this._userDetails, value);
		}
		else {
			if (localStorage.getItem(this._userDetails) !== null) {
				localStorage.removeItem(this._userDetails);
			}
		}
	}
}
