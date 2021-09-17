import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../menu/services/navbar.service';

@Component({
  selector: 'app-footer-toolbar',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit() {
  }

}
