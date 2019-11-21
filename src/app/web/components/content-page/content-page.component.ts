import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../../shared/services/router.service';
import { PageSlug } from '../../../shared/constants/enum';
import { WebService } from '../../services/web.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {

  constructor(public route: RouterService
    , private activatedRoute: ActivatedRoute
    , private errorHandlerService: ErrorHandlerService
    , private webService: WebService) { }

  pageData: any = {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(r => {
      if (r.length > 0) {
        switch (r[0].path) {
          case this.route.commonMenu.privacyPolicy:
            this.getPageData(PageSlug.privacyPolicy);
            break;
          case this.route.commonMenu.termsCondition:
            this.getPageData(PageSlug.termsConditions);
            break;
          case this.route.commonMenu.refundPolicy:
            this.getPageData(PageSlug.refundPolicy);
            break;
        }
      }
    })
  }

  getPageData(slug) {
    this.webService.pageBySlug(slug).pipe().subscribe((result) => {
      
      if (result != null) {
        this.pageData = result.body;
      }
    }, error => {
      this.errorHandlerService.handleError(error)
    }
    );
  }



}
