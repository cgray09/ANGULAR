import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post?: any; // Post;
  @Input() index: number = 0;

  email: any = localStorage.getItem('email');
  canEdit: any = false;
  memberName = 'Sam';
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.post);
    console.log("index ", this.post?.key);
    if (this.email === this.post?.email) {
      this.canEdit = true;
    }
  }

  onDelete() {
    console.log('onDelete() called!');
    console.log("delete: ", this.post);
    this.postService.deletePost(this.post);
  }

  onEdit() {
    console.log('onEdit() called!');
    this.router.navigate(['/post-edit', this.post.id]);
  }

  likePost() {
    //console.log('ID: ', this.post?.key);
    this.postService.likePost(this.post, this.post?.numberOfLikes);
  }
}
