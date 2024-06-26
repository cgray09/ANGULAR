import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

import { Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  currentPost: Post = {
    id: 0,
    title: '',
    body: ''
  }
  isEdit: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {  
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  // so when this component is notified by "post-form"
  // do this
  onNewPost(post: Post) {
    this.posts.unshift(post);
  }

  editPost(post: Post) {
    this.currentPost = post;
    this.isEdit = true;
  }

  onUpdatedPost(post: Post) {
    this.posts.forEach((cur, index) => {
      if(post.id === cur.id) {
        this.posts.splice(index, 1); // remove the post were updating which is the post before its updated
        this.posts.unshift(post);    // and add the updated post to the front of the list
        this.isEdit = false;
        this.currentPost = {
          id: 0,
          title: '',
          body: ''
        }
      }
    });
  }

  removePost(post: Post) {
    if(confirm('Are You Sure?')) {
      this.postService.removePost(post.id).subscribe(() => {
        this.posts.forEach((cur, index) => {
          if(post.id === cur.id) {
            this.posts.splice(index, 1);  
          }
        });
      });
    }
  }

}
