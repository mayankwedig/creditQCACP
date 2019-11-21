import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaulterService } from '../../../services/defaulter.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { DateFormatEnum } from '../../../../shared/constants/enum';
import { DateFormatService } from '../../../../shared/services/date-format.service';
import { RouterService } from '../../../../shared/services/router.service';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-defaulter-detail',
  templateUrl: './defaulter-detail.component.html',
  styleUrls: ['./defaulter-detail.component.css']
})
export class DefaulterDetailComponent implements OnInit {

  constructor(private defaulterService: DefaulterService,
    private errorHandlerService: ErrorHandlerService,
    public dateFormatService: DateFormatService,
    public routerService: RouterService,
    private activatedRoute: ActivatedRoute) { }


  fileBaseUrl: string = environment.services.files.baseUrl + environment.services.files.viewDocument;
  public dataFormat = DateFormatEnum;
  data: any = {}
  request_id: any = 0
  redirectUrl: any = 'defaulter'

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.request_id = atob(params.id);  //(+) converts string 'id' to a number
      this.getDetails(this.request_id)
    });

    //redirect url
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.redirect) {
        this.redirectUrl = params.redirect
      }
    });

  }

  getDetails(id) {

    this.defaulterService.getById(id).pipe().subscribe((result) => {
      if (result != null) {
        this.data = result.body;
        if (this.data.documents) {
          this.data.documents.map(item => {
            item.file = this.fileBaseUrl + item.file
          })
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
    this.routerService.RedirectUserUrl(this.redirectUrl)
  }

}
