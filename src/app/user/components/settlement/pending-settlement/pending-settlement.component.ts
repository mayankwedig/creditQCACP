import { Component, OnInit } from '@angular/core';
import { DefaulterService } from '../../../services/defaulter.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { DateFormatEnum, StatusEnum, BoolStatus, SettlementType } from '../../../../shared/constants/enum';
import { DateFormatService } from '../../../../shared/services/date-format.service';
import { RouterService } from '../../../../shared/services/router.service';
import * as $ from 'node_modules/jquery';

@Component({
  selector: 'app-pending-settlement',
  templateUrl: './pending-settlement.component.html',
  styleUrls: ['./pending-settlement.component.css']
})
export class PendingSettlementComponent implements OnInit {

  constructor(private defaulterService: DefaulterService,
    private localStorageService: LocalStorageService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    private routerService: RouterService) { }

  postData: any = {}
  listData: any = []
  dataFormat = DateFormatEnum;
  statusEnum = StatusEnum
  isSearch: boolean = false;
  settlementType = SettlementType

  ngOnInit() {
    this.getList()
  }

  getList() {
    this.postData.customer_id = this.localStorageService.userDetails.id;
    this.postData.status = this.statusEnum.Verified;
    this.postData.settlement_finish = BoolStatus.no;
    this.defaulterService.requesterList(this.postData).pipe().subscribe((result) => {
      if (result != null) {
        this.listData = result.body;
        // if (this.listData.length == 1) {
        //   this.settlement(this.listData.id)
        // }
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
    this.routerService.RedirectDefaulterDetails(sId, this.routerService.userMenu.pendingSettlement)
  }

  settlement(id: string, type) {
    let sId = btoa(id)
    this.routerService.RedirectPaymentSettlements(sId, type)
  }

  loadJS(event) {
    if (!$(event.target).parent('.ct-btn').parent(".ct-dropdown").hasClass("open")) {
      $(".ct-dropdown").removeClass("open");
      $(event.target).closest(".ct-dropdown").addClass("open");
    } else {
      $(".ct-dropdown").removeClass("open");
    }
  }

  resetSearch() {
    this.isSearch = false;
    this.postData.gst_no = ''
    this.postData.status = ''
    this.getList()
  }

}

