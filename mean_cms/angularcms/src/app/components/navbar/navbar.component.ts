import { Component, OnInit } from '@angular/core';

import { PageService } from './../../services/page.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    pages: any;
    user: string;

    get userLoggedIn() {
        if (localStorage.getItem("user")) {
            this.user = localStorage.getItem("user").replace(/\"/g, ""); // the RE replaces
                                                                         // one of the double
                                                                         // quotes w/ nothing
                                                                         // since its in double
                                                                         // quotes from stringify
            return true;
        }
        return false;
    }

    constructor(public pageService: PageService) { }

    ngOnInit() {
        this.pageService.getPages().subscribe(pages => {
            this.pageService.pagesBS.next(pages); // adding the pages to "pagesBS"
            this.pages = this.pageService.pagesBS;
        });
    }

}
