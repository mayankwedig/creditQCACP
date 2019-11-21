import { Injectable } from '../../../../node_modules/@angular/core';
import { BehaviorSubject, Observable } from '../../../../node_modules/rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SessionStorageService {
	private userAuthDetailsBehaviorSubject = new BehaviorSubject(null);
	private userDetailsBehaviorSubject = new BehaviorSubject(null);
	private userRegistrationBehaviorSubject = new BehaviorSubject(null);

	constructor(private localStorageService: LocalStorageService) {
	}

	public flushOnLogout(): void {
		this.setUserAuthDetails(null);
		this.setUserDetails(null);
	}

	// User Auth Details
	get userAuthDetails() {
		return this.userAuthDetailsBehaviorSubject.asObservable();
	}

	public setUserAuthDetails(value) {
		if (value === null) {
			this.localStorageService.authToken = null;
		}
		else {
			this.localStorageService.authToken = value.token;
		}
		this.userAuthDetailsBehaviorSubject.next(value);
	}

	// User Details
	get userDetails() {
		return this.userDetailsBehaviorSubject.asObservable();
	}

	public setUserDetails(value) {
		this.localStorageService.userDetails = JSON.stringify(value);
		this.userDetailsBehaviorSubject.next(value);
	}

	get userRegistration() {
		return this.userRegistrationBehaviorSubject.asObservable();
	}

	public setUserRegistration(value) {
		this.userRegistrationBehaviorSubject.next(value);
	}


}