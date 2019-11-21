import { Injectable } from '../../../../node_modules/@angular/core';
import { ApiResponseCode } from '../constants/api-response-code';
import { RouterService } from './router.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../shared/services/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(
        private routerService: RouterService,
        private toastrService: ToastrService,
        public sessionStorageService: SessionStorageService) {
    }

    public handleError(error: any) {
        //let displayLogoutNotification = true;
        if (error.status == ApiResponseCode.UNAUTHORIZED) {
            this.sessionStorageService.flushOnLogout()
            this.routerService.RedirectHome();
            return false;
        } else if (error.status == ApiResponseCode.Error) {
            let errors = error.error;
            this.toastrService.error(errors['message']);
        } else if (error.status == ApiResponseCode.Success) {
            let errors = error.error;
            this.toastrService.error(errors['message']);
        } else if (error.status == ApiResponseCode.ServerError) {
            let errors = error.error;
            this.toastrService.error(errors['message']);
        } else if (error.status == ApiResponseCode.NOTFOUND) {
            //this.toastMessageService.showErrorMessage('Page not found.');
        } else {
            this.toastrService.error('Something went wrong. Please contact administrator.');
        }
    }

    closeLogoutNotification() {

    }

    public defaultError() {
        this.toastrService.error("Something went wrong. Please try again");
    }
    public successMessage(message: any) {
        this.toastrService.success(message, '', { timeOut: 3000 });
    }

    public errorMessage(message: any) {
        this.toastrService.error(message, '', { timeOut: 50000 });
    }
    public errorMessageNoDataFound() {
        this.toastrService.info("No data found. Please try again");
    }

}
