// @ts-nocheck
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/cours.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MatInputModule } from '@angular/material/input';
import { mergeMap, map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/compat/storage";
//import { R3ResolvedDependencyType } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  regiForm:FormGroup;
  categories:any[];
  course:Course;
  form: any;
  imagePreview: any;
  error: any = null;
  urdownloadURL: any = null;
  filePath: any = null;
  task: any;
  ref: any;
  db;

  constructor(private fb:FormBuilder,private serviceCategorie:CategorieService,
    private storage: AngularFireStorage,
    private serviceCourse:CourseService,
    public dialogRef: MatDialogRef<CourseComponent>,
    @Inject(MAT_DIALOG_DATA) public idCourse
    ) { 
   
 
  }

  ngOnInit() {
    if(!this.idCourse)
    {
    this.serviceCategorie.getAllCategories()
                         .subscribe(categories=>{
                           this.categories=categories;
                           this.initalizeCourse(null);
                          });
    }
    else
    {
      this.serviceCategorie.getAllCategories()
                           .pipe(
                             mergeMap(categories=>this.serviceCourse.getCoursebyId(this.idCourse.id).pipe(
                              map(course=>{
                                return ([categories,course])
                              })
                             ))).subscribe(([categories,course])=>{
                                 this.categories=categories as any[];
                                 this.course=course as Course;
                                 this.initalizeCourse(course);
                             })
                        
                           
     
    }
  }
  initalizeCourse(course)
  {
    this.regiForm = this.fb.group({  
      'Title' : [ course?course.title:null,Validators.required],  
      'Description' : [course?course.description:null, Validators.required],  
      'Price' : [ course?course.price:null,Validators.required],  
      'UrlImage' : [ course?course.urlImage:null,Validators.required],  
      'Categorie':[ course?course.categorie:null,Validators.required]
    });

  }

  onImagePicked(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `BooksImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.db = url;
            }
            console.log(this.db);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  onSubmit(form)
  {
    console.log(form);
    if(this.regiForm.valid)
    {
      let course:Course={
        id:this.idCourse?this.idCourse.id:'',
        title:form.Title,
        description:form.Description,
        categorie:form.Categorie,
        price:form.Price,
        urlImage:form.UrlImage
      }
       if(!this.idCourse)
       {
      this.serviceCourse.AddCourse(course).then(()=>{
        this.dialogRef.close();
      });
      }
      else
      {
        this.serviceCourse.updateCourse(course).then(()=>{
          this.dialogRef.close();
        });
      }
     
     }

    

  }
}
