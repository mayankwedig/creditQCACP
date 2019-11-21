import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../shared/services/router.service';
import { WebService } from '../../../web/services/web.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public route: RouterService
    , private webService: WebService
    , private errorHandlerService: ErrorHandlerService) { }

  postData: any = { email: '' }

  ngOnInit() {
  }

  save() {
    if (this.postData.email != '' && this.postData.email != null) {
      this.webService.saveSubscriber(this.postData).pipe().subscribe((result) => {
        this.postData.email = ''
        this.errorHandlerService.successMessage('Thank you for subscribe newsletter.');
      }, error => {
        this.errorHandlerService.handleError(error)
      }
      );
    }
    else {
      this.errorHandlerService.errorMessage('Please enter email id')
    }
  }

}
