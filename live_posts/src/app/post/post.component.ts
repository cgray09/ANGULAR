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
    console.log(this.index);
    if (this.email === this.post?.author) {
      this.canEdit = true;
    }
  }

  onDelete() {
    console.log('onDelete() called!');
    this.postService.deletePost(this.post?.key);
  }

  onEdit() {
    console.log('onEdit() called!');
    this.router.navigate(['/post-edit', this.post?.key]);
  }

  likePost() {
    //console.log('ID: ', this.post?.key);
    this.postService.likePost(this.post?.key, this.post?.numberOfLikes);
  }
}
