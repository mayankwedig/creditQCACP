import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WebService } from '../../services/web.service';
import { RouterService } from '../../../shared/services/router.service';
import { CommonService } from '../../../shared/services/common.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { QueryType } from '../../../shared/constants/enum';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private webService: WebService
    , private errorHandlerService: ErrorHandlerService
    , public route: RouterService, public commonService: CommonService) { }

  listData: any = [];
  postData: any = { email: '', first_name: '', last_name: '', mobile: '', issues: '', type: QueryType.issue }
  recordCount: number = 0;
  pageNo: number = 1;
  maxPageNo: number = 1;
  page_size: number = 10;
  pageList: any = []

  ngOnInit() {
    this.getList()
  }

  getList() {
    let faqPost = {
      page_size: this.page_size,
      page_no: this.pageNo
    }
    this.pageList = []
    this.webService.faqs(faqPost).pipe().subscribe((result) => {
      if (result != null) {
        this.listData = result.body;
        this.recordCount = result.recordCount;
        this.maxPageNo = parseInt(Math.round(result.recordCount / this.page_size).toFixed(0))
        for (let i = 1; i <= this.maxPageNo; i++) {
          this.pageList.push(i)
        }
      }
    }, error => {
      this.errorHandlerService.handleError(error)
    }
    );
  }

  changePage(page) {
    this.pageNo = page;
    this.getList()
  }

  nextPage() {
    if (this.pageNo < this.maxPageNo) {
      this.pageNo = this.pageNo + 1;
      this.getList()
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo = this.pageNo - 1;
      this.getList()
    }
  }

  save(form: NgForm) {
    this.webService.saveQuery(this.postData).pipe().subscribe((result) => {
      this.errorHandlerService.successMessage('Your query successfully submitted. Our executive will be contact within 24 hours.');
      form.reset();
    }, error => {
      this.errorHandlerService.handleError(error)
    }
    );
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
