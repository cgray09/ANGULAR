// @ts-nocheck
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database'
//import { MatGridTileHeaderCssMatStyler } from '@angular/material';
import {map} from 'rxjs/operators'
import { Course } from '../models/cours.model';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db:AngularFireDatabase) { }
  getAllCourses()
  {
   return this.db.list('/courses')
                 .snapshotChanges()
                 .pipe(
                  map(changes =>
                    changes.map(c => (
                      { 
                        key: c.payload.key, ...c.payload.val() 
                      }
                      ))
                 )
                 )
  }
   AddCourse(course:Course)
   {
     return this.db.list('/courses/').push({
      title:course.title,
      description:course.description,
      categorie:course.categorie,
      price:course.price,
      urlImage:course.urlImage
     })
   }
   getCoursebyId(uid:string)
   {
    return this.db.object('/courses/'+uid)
            .snapshotChanges()
            .pipe(
              map(course=>{
                let obj:any=course.payload.val();
                let courseTemp:Course={
                  id:course.key,
                  categorie:obj.categorie,
                  description:obj.description,
                  price:obj.price,
                  title:obj.title,
                  urlImage:obj.urlImage
                }
                return courseTemp
              })
            )
   }
   updateCourse(course:Course)
   {
     return this.db.object('/courses/'+course.id).update({
      title:course.title,
      description:course.description,
      categorie:course.categorie,
      price:course.price,
      urlImage:course.urlImage
     }
     )
   }
   deleteCourse(id:string)
   {
     return this.db.object('/courses/'+id).remove();
   }

}
