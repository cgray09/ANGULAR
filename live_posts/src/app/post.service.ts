// @ts-nocheck
import { EventEmitter, Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import{AngularFireDatabase} from '@angular/fire/compat/database';
import {map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })
export class PostService {
  listChangedEvent: EventEmitter<Post[]> = new EventEmitter();
  // listOfPosts: Post[] = [];
  listChanged = new Subject<Post[]>();
  postData: any;
  postsCollection: AngularFirestoreCollection<any>; // gets a collection of users
  postDoc: AngularFirestoreDocument<Post>;  // gets a single user
  listOfPosts: Observable<Post[]>;
  post: Observable<Post>;

  constructor(private afs: AngularFirestore, private db2:AngularFireDatabase, private http: HttpClient) { 
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('date', 'desc'))
  }

  // facility 1
  getPosts() {
    this.listOfPosts =  this.postsCollection
        .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

    // console.log("POSTS: ", this.listOfPosts);
    return this.listOfPosts; 
  }

  // facility 5
  getPost(id: number) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    // had to do all of this snapshotChanges().map b/c we need the id
    this.post = this.postDoc.snapshotChanges().pipe(
        map(action => {
          if(action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Post;
            data.id = action.payload.id;
            return data;
          }
        })
      );
      // console.log("NEW POST service: ", this.post);
    return this.post;
  }

  // facilty 2
  deletePost(post: Post) {
    this.postDoc = this.afs.doc(`posts/${post.id}`);
    this.postDoc.delete();
  }

  // Facility 3
  addPost(post: any) {
    this.postsCollection.add(post);
  }

  // facility 4
  updatePost(id: any, post: Post) {
    this.postDoc = this.afs.doc(`posts/${id}`);
    this.postDoc.update(post);
  }

  // facility 6
  likePost(post: Post, likes: number) {
    // console.log("Likes: ", likes);
    if (likes) {
      likes += 1;
      const editPost: Post = {
        title: post.title,
        description: post.description,
        imagePath: post.imagePath,
        email: post.email,
        date: post.date,
        numberOfLikes: likes,
        id: post.id
      };
      this.postDoc = this.afs.doc(`posts/${post.id}`);
      this.postDoc.update(editPost);
    } else {
      const editPost: Post = {
        title: post.title,
        description: post.description,
        imagePath: post.imagePath,
        email: post.email,
        date: post.date,
        numberOfLikes: 1,
        id: post.id
      };
      this.postDoc = this.afs.doc(`posts/${post.id}`);
      this.postDoc.update(editPost);
    }
  }

  // facility 7
  setPosts(listOfPosts: Post[]) {
    for(var key in listOfPosts) {
      // console.log("OBJ: ", listOfPosts[key]);
      // this.listOfPosts.push(listOfPosts[key]);
      this.listOfPosts.unshift(listOfPosts[key]);
    }
    this.listChangedEvent.emit(listOfPosts);
  }
}
