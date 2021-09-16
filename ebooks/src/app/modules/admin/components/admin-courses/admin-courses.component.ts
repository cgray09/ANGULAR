// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseComponent } from 'src/app/modules/courses/components/course/course.component';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  courses:any[];
  displayedColumns: string[] = ['title', 'description','categorie','urlImage','price','actions'];
  constructor(private serviceCourse:CourseService,private serviceDialog: MatDialog) { }

  ngOnInit() {
    this.serviceCourse.getAllCourses()
                      .subscribe(courses=>this.courses=courses)


                    
  }
  AddCourse()
  {
    this.serviceDialog.open(CourseComponent,{
      width:'650px'
    })

  }
  Edit(row)
  {
    this.serviceDialog.open(CourseComponent,{
      width:'650px', data:{id:row.key}
    })
  }
  Delete(row)
  {
    if(window.confirm('Are sure you want to delete this course ?')) this.serviceCourse.deleteCourse(row.key);

  }

}
