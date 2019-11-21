import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { RouterService } from '../../../shared/services/router.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { QueryType } from '../../../shared/constants/enum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private webService: WebService
    , private errorHandlerService: ErrorHandlerService
    , public route: RouterService) { }


  ngOnInit() {
  }

  postData: any = { email: '', first_name: '', last_name: '', company_name: '', gst_no: '', mobile: '', issues: '', type: QueryType.contact }

  errorMessage: string = ''
  save(form: NgForm) {
    this.errorMessage = ''
    if (this.postData.mobile.length != 10) {
      this.errorMessage = 'Invalid Mobile Number'
    } else {
      this.webService.saveQuery(this.postData).pipe().subscribe((result) => {
        this.errorHandlerService.successMessage('Your query successfully submitted. Our executive will contact within 24 hours.');
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
