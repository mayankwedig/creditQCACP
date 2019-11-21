import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterService } from '../../../shared/services/router.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(public route: RouterService
    , private activatedRoute: ActivatedRoute
    , private router: Router) { }

  home: string = ''
  about: string = ''
  contact: string = ''
  solution: string = ''
  help: string = ''

  ngOnInit() {
    //Check for full size page
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        let urls = val.url.replace('/', '')
        this.addClass(urls)
      }
    });
  }

  addClass(path) {
    this.home = ''
    this.about = ''
    this.contact = ''
    this.solution = ''
    this.help = ''

    switch (path) {
      case this.route.commonMenu.home:
        this.home = 'active'
        break;

      case this.route.commonMenu.aboutUs:
        this.about = 'active'
        break;

      case this.route.commonMenu.solution:
        this.solution = 'active'
        break;

      case this.route.commonMenu.help:
        this.help = 'active'
        break;

      case this.route.commonMenu.contactUs:
        this.contact = 'active'
        break;
      case "":
        this.home = 'active'
        break;
    }
  }

}
