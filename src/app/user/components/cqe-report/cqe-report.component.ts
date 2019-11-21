import { Component, OnInit } from '@angular/core';
import { CQEService } from '../../services/cqe.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { DateFormatEnum, CQERequestStatus } from '../../../shared/constants/enum';
import { DateFormatService } from '../../../shared/services/date-format.service';
import { RouterService } from '../../../shared/services/router.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cqe-report',
  templateUrl: './cqe-report.component.html',
  styleUrls: ['./cqe-report.component.css']
})
export class CQEReportComponent implements OnInit {

  constructor(private cqeService: CQEService,
    private localStorageService: LocalStorageService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    public routerService: RouterService) { }
    public fileBaseUrl: string = environment.services.files.baseUrl + environment.services.files.viewDocument;

  postData: any = {}
  public listData: any = []
  public dataFormat = DateFormatEnum;
  public isSearch: boolean = false;
  public cibilRequestStatus = CQERequestStatus

  ngOnInit() {
    this.getList()
  }

  getList() {
    this.postData.customer_id = this.localStorageService.userDetails.id;
    this.cqeService.requesterList(this.postData).pipe().subscribe((result) => {
      if (result != null) {
        //this.listData.CIR_full_path = this.fileBaseUrl+result.body.invoice_name;
        this.listData = result.body;
      } else {
        this.errorHandlerService.defaultError()
      }
    }, error => {

      this.errorHandlerService.handleError(error)
    }
    );
  }

  // searchList() {
  //   if (this.postData.gst_no != '' && this.postData.gst_no != null) {
  //     this.isSearch = true;
  //     this.postData.status = ''
  //     this.getList()
  //   }
  // }

  // resetSearch() {
  //   this.isSearch = false;
  //   this.postData.gst_no = ''
  //   this.postData.status = ''
  //   this.getList()
  // }

}

