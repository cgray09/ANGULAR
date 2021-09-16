import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import { AuthService } from "./modules/authen/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-firebase';

  constructor(private authService: AuthService, private db:AngularFireDatabase)
  {

  }
  ngOnInit() {
    this.authService.autoAuthUser();
    this.db.list('/courses').valueChanges()
                            .subscribe(courses=>console.log(courses));
  }
  
}
