import { NgModule } from '@angular/core';
import { CoursesComponent } from './components/courses/courses.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { AppModuleMenu } from '../menu/app.module';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CourseComponent } from './components/course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseContentComponent } from './components/course-content/course-content.component';

@NgModule({
    declarations: [CoursesComponent, CourseComponent, CourseContentComponent],
    imports: [
      MaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      MatSnackBarModule
    ],
    providers: [],
    bootstrap: []
  })
  export class AppModuleCourses{ }