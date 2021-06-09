import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" }) // this line is so angular can find the service
export class PostsService {
  private posts: Post[] = [];
  
  // { posts: Post[]; postCount: number } - is what postsUpdated will pass as a
  // parameter
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      ) // the angular http uses observables (built in) so must subscribe (listen for a req)
      .subscribe(transformedPostData => { // angular does the unsubscribe for you since
        this.posts = transformedPostData.posts; // the observable is built in the http
        // postsUpdated - emits an event for components interested and passes 
        // the data (tells the app about the event )
        this.postsUpdated.next({
          posts: [...this.posts], // [...this.posts] - creates a new array of the old array
          postCount: transformedPostData.maxPosts
        });
      });
  }

  // used to notify components (if interested) of changes to posts (emits events)
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {

    // couldnt do the http request here bc you cant return 
    // on something that we subscribe on so have to do the
    // subscribe in the component that calls this function

    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title); // "image" - must match the "image"
    this.http                               // property used w/ multer on the backend route
      .post<{ message: string; post: Post }>( // <{ message: string; post: Post }> - is what this
        BACKEND_URL,                          // route returns
        postData
      )
      .subscribe(responseData => { // like returning a promise in react so this is
        this.router.navigate(["/"]);  // what we do if successful
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {          // since we must always "subscribe" to an
        this.router.navigate(["/"]);    // observable - observables are pretty much
      });                               // the same thing as promises in react
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
