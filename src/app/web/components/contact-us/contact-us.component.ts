import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { CommonService } from '../../../shared/services/common.service';
import { RouterService } from '../../../shared/services/router.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { QueryType } from '../../../shared/constants/enum';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private webService: WebService
    , private errorHandlerService: ErrorHandlerService
    , public route: RouterService, public commonService: CommonService) { }
  
  postData: any = { email: '', first_name: '', last_name: '', company_name: '', gst_no: '', mobile: '', issues: '', type: QueryType.contact }
  errorMessage: string = ''
  ngOnInit() {
  }

  save(form: NgForm) {
    this.errorMessage = ''
    if (this.postData.gst_no.length != 15) {
      this.errorMessage = 'Invalid GST Number'
    } else if (this.postData.mobile.length != 10) {
      this.errorMessage = 'Invalid Mobile Number'
    } else {
      this.webService.saveQuery(this.postData).pipe().subscribe((result) => {
        this.errorHandlerService.successMessage('Your query successfully submitted. Our executive will be contact within 24 hours.');
        form.reset();
      }, error => {
        this.errorHandlerService.handleError(error)
      });
    }
  }

  removeError() {
    this.errorMessage = ''
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}