import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  listOfPosts: any;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts=>{
      this.listOfPosts=posts;
    });
    // this.postService.listChangedEvent.subscribe((listOfPosts:Post[])=> {
    //   this.listOfPosts = this.postService.getPosts();
    // })
  }
}
