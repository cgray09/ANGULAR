// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import * as uuid from 'uuid';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  form!: FormGroup;
  index: number = 0;
  editMode = false;
  postData: any;
  post: any;
  postById: any;
  
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let title = '';
    let description = '';
    let imagePath = '';

    this.route.params.subscribe((params: Params) => {
      if (params['index']) {
        console.log(params['index']);

        this.index = params['index'];

        this.postService.getPosts().subscribe(posts=>{
            this.postData = posts;
      
        }); 

        // this.postService.getPost(this.index).subscribe(post => {
        //   this.post = post;
        // });

        // this.postService.getPost(this.index).subscribe(post => this.post = post);

        // this.post = this.postService.getPost(this.index);
        // console.log("NEW POST: ", this.post);
        // title = this.post.title;
        // description = this.post.description;
        // imagePath = this.post.imagePath;

        this.editMode = true;
      }
    });

    this.form = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
    });
  }

  onSubmit() {
    const title = this.form.value.title;
    const description = this.form.value.description;
    const imagePath = this.form.value.imagePath;
    const email = localStorage.getItem('email');
    const date = new Date();
    
    const post: any = {
      title,
      description,
      imagePath,
      email,
      date,
      numberOfLikes: 0,
      //id
    };

    // Calling service
    if (this.editMode) {
      this.postService.updatePost(this.index, post);
    } else {
      // console.log("POST: ", post);
      this.postService.addPost(post);
    }

    // Navigate to /post-list
    this.form.reset();
    this.router.navigate(['/post-list']);
  }
}
