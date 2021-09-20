import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { tap } from 'rxjs/operators';

/**
 * Database Path
 * https://live-posts-63eff-default-rtdb.firebaseio.com/
 */

@Injectable({ providedIn: 'root' })
export class BackEndService {
  constructor(private postService: PostService, private http: HttpClient) {}

  // Fun 1 - Save
  // saveData() {
  //   // Step 1 - get list of posts from post.service
  //   const listOfPosts: Post[] = this.postService.getPosts();
  //   // Step 2 - send list of posts to backend
  //   this.http
  //     .put(
  //       'https://live-posts-4809c-default-rtdb.firebaseio.com/posts.json',
  //       listOfPosts
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  // Fun 2 - Fetch
  fetchData() {
    // Step 1
    this.http
      .get<Post[]>(
        'https://live-posts-4809c-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        tap((listOfPosts: Post[]) => {
          console.log(listOfPosts);

          // Step 2 - Send to post.service
          this.postService.setPosts(listOfPosts);
        })
      )
      .subscribe();
  }
 }
