import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { DateFormatEnum } from '../../../../shared/constants/enum';
import { DateFormatService } from '../../../../shared/services/date-format.service';
import { RouterService } from '../../../../shared/services/router.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {


  constructor(private paymentService: PaymentService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    public routerService: RouterService,
    private activatedRoute: ActivatedRoute) { }
    fileBaseUrl: string = environment.services.files.baseUrl + environment.services.files.viewDocument;
  
  public dataFormat = DateFormatEnum;
  data: any = {}
  invoice_id: any = 0
  gstStateCode: any = '';
  public show_gst: String = ""; // state_gst/igst
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.invoice_id = atob(params.id);  //(+) converts string 'id' to a number
      this.getDetails(this.invoice_id)
    });

  }

  // getDetails(id) {

  //   this.paymentService.getById(id).pipe().subscribe((result) => {
  //     if (result != null) {
  //       this.data = result.body;
  //       this.data.invoice_full_path = this.fileBaseUrl+result.body.invoice_name;
  //     } else {
  //       this.errorHandlerService.defaultError()
  //     }
  //   }, error => {
  //     this.errorHandlerService.handleError(error)
  //   }
  //   );
  // }
  getDetails(id) {

    this.paymentService.getById(id).pipe().subscribe((result) => {
      if (result != null) {
        this.data = result.body;
        this.data.invoice_full_path = this.fileBaseUrl + result.body.invoice_name;
        this.gstStateCode = this.data.gst_no.substr(0, 2);
        
        // if (this.data.discount_amount != 0) {
        //   if (this.gstStateCode != "08") {
        //     this.data.paid_amount = this.data.total_amount - this.data.discount_amount;
        //     this.data.gst_amount = Math.round(this.data.paid_amount * (this.data.igst_amount) / 100).toFixed(0);
        //     this.data.paid_amount = parseFloat(this.data.gst_amount) + parseFloat(this.data.paid_amount);
        //   } else {
        //     this.data.paid_amount = this.data.total_amount - this.data.discount_amount;
        //     this.data.cgst_amount = Math.round(this.data.paid_amount * (this.data.cgst_amount) / 100).toFixed(0);
        //     this.data.sgst_amount = Math.round(this.data.paid_amount * (this.data.sgst_amount) / 100).toFixed(0);
        //     this.data.gst_amount = Math.round(this.data.paid_amount * (this.data.cgst_amount + this.data.sgst_amount) / 100).toFixed(0);
        //     this.data.paid_amount = parseFloat(this.data.gst_amount) + parseFloat(this.data.paid_amount);
        //   }
        // } else {
        //   if (this.gstStateCode != "08") { // IGST
        //     this.data.gst_amount = Math.round(this.data.total_amount * (this.data.igst_amount) / 100).toFixed(0);
        //     this.data.total_amount = parseFloat(this.data.total_amount);
        //     this.data.paid_amount = parseFloat(this.data.gst_amount) + parseFloat(this.data.total_amount);
        //   } else { //CGST
        //     // this.data.gst_per = this.data.cgst_amount + this.data.sgst_amount;
        //     this.data.cgst_amount = Math.round(this.data.total_amount * (this.data.cgst_amount) / 100).toFixed(0);
        //     this.data.sgst_amount = Math.round(this.data.total_amount * (this.data.sgst_amount) / 100).toFixed(0);
        //     this.data.total_amount = parseFloat(this.data.total_amount);
        //     this.data.gst_amount = Math.round(this.data.total_amount * (this.data.cgst_amount + this.data.sgst_amount) / 100).toFixed(0);
        //     this.data.paid_amount = parseFloat(this.data.gst_amount) + parseFloat(this.data.total_amount);
        //   }
        //   this.data.discount_amount = 0;
        // }
        if (this.gstStateCode == "08") {
          // state gst
          this.show_gst = "state_gst";
        } else {
          // igst
          this.show_gst = "igst";
        }
      } else {
        this.errorHandlerService.defaultError()
      }
    }, error => {
      this.errorHandlerService.handleError(error)
    }
    );
  }


  redirectBack() {
    this.routerService.RedirectInvoice()
  }

}
