// @ts-nocheck
import { EventEmitter, Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import{AngularFireDatabase} from '@angular/fire/compat/database';
import {map} from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PostService {
  listChangedEvent: EventEmitter<Post[]> = new EventEmitter();
  listOfPosts: any; // Post[] = [];
  listChanged = new Subject<Post[]>();
  postData: any;

  constructor(private db:AngularFireDatabase ) { }

  // facility 1
  getPosts() {
    return this.db.list('/posts')
            .snapshotChanges()
            .pipe(
              map(changes =>
                changes.map(c => (
                  { 
                    key: c.payload.key, ...c.payload.val() as {}
                  }
                ))
              )
            )
            
  }

  // facilty 2
  deletePost(id: number) {
    //this.listOfPosts.splice(index, 1);
    this.db.object('/posts/'+id).remove();
  }

  // Facility 3
  addPost(post: any) {
    this.db.list('/posts').push(post);
  }

  // facility 4
  updatePost(index: number, post: Post, likes: any) {
    // console.log("LIKES: ", likes[0].numberOfLikes);
    this.db.object('/posts/'+index).update({
      title: post.title,
      description: post.description,
      imagePath: post.imagePath,
      author: post.author,
      numberOfLikes: likes[0].numberOfLikes
     })
     //this.listOfPosts[this.listOfPosts.length] = post;
  }

  // facility 5
  getPost(id: number) {
    return this.listOfPosts[id];
  }

  // facility 6
  likePost(index: number, likes: number) {
    //this.listOfPosts[index].numberOfLikes += 1;
    console.log("Likes: ", likes);
    if (likes) {
      likes += 1;
      this.db.object('/posts/'+index).update({
      numberOfLikes: likes,
     })
    } else {
      this.db.object('/posts/'+index).update({
      numberOfLikes: 1,
     })
    }
    
  }

  // facility 7
  setPosts(listOfPosts: Post[]) {
    this.listOfPosts = listOfPosts;
    this.listChangedEvent.emit(listOfPosts);
  }
}
