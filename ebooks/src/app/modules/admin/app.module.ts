import { NgModule } from '@angular/core';
import { AdminCoursesComponent } from './components/admin-courses/admin-courses.component';
import { MaterialModule } from 'src/app/material-ui.module';
// import { BrowserModule } from '@angular/platform-browser';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AppModuleCourses } from '../courses/app.module';
import { CourseComponent } from '../courses/components/course/course.component';

@NgModule({
    declarations: [AdminCoursesComponent],
    imports: [
        MaterialModule,
        CommonModule,
        AppModuleCourses
        ],
    exports:[AdminCoursesComponent],
    entryComponents:[CourseComponent],
    providers: [],
    bootstrap: []
  })
  export class AppModuleAdmin { }