// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
 idCourse;
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.idCourse=this.router.snapshot.params['id'];
  }

}
