import { Component, OnInit } from '@angular/core';
import { DefaulterService } from '../../services/defaulter.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { DateFormatEnum, BoolStatus } from '../../../shared/constants/enum';
import { DateFormatService } from '../../../shared/services/date-format.service';
import { RouterService } from '../../../shared/services/router.service';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {

  constructor(private defaulterService: DefaulterService,
    private localStorageService: LocalStorageService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    private routerService: RouterService) { }

  postData: any = {}
  public listData: any = []
  public dataFormat = DateFormatEnum;
  public isSearch: boolean = false;

  ngOnInit() {
    this.getList()
  }

  getList() {
    this.postData.settlement_finish = BoolStatus.yes;
    this.postData.customer_id = this.localStorageService.userDetails.id;
    this.defaulterService.requesterList(this.postData).pipe().subscribe((result) => {
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

  searchList() {
    if (this.postData.gst_no != '' && this.postData.gst_no != null) {
      this.isSearch = true;
      this.postData.status = ''
      this.getList()
    }
  }

  viewDetail(id: string) {
    let sId = btoa(id)
    this.routerService.RedirectDefaulterDetails(sId, this.routerService.userMenu.settlements)
  }

  resetSearch() {
    this.isSearch = false;
    this.postData.gst_no = ''
    this.postData.status = ''
    this.getList()
  }

}

