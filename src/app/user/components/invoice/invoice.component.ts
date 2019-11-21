import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { DateFormatEnum, BoolStatus } from '../../../shared/constants/enum';
import { DateFormatService } from '../../../shared/services/date-format.service';
import { RouterService } from '../../../shared/services/router.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  constructor(private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    private routerService: RouterService) { }

  postData: any = {}
  public listData: any = []
  loginUser: any = {}
  public dataFormat = DateFormatEnum;

  ngOnInit() {

    if (this.localStorageService.userDetails) {
      this.loginUser = this.localStorageService.userDetails;
    }

    this.getList()
  }



  getList() {
    this.postData.customer_id = this.localStorageService.userDetails.id;
    this.paymentService.list(this.postData).pipe().subscribe((result) => {
      if (result != null) {
        this.listData = result.body;
      } else {
        this.errorHandlerService.defaultError()
      }
    }, error => {
      this.errorHandlerService.handleError(error)
    }
    );
  }

  viewDetail(id: string) {
    let sId = btoa(id)
    this.routerService.RedirectInvoiceDetail(sId)
  }


}
