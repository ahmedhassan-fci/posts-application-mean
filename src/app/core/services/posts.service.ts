import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { IPost } from '../models';

const BACKEND_URL = environment.apiUrl + 'posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    return this.http
      .get<{ message: string; posts: any; count: number }>(BACKEND_URL)
      .pipe(catchError(this.errorHandler));
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: IPost;
    }>(BACKEND_URL + id);
  }

  addPost(value: any) {
    const postData = new FormData();
    postData.append('title', value.title);
    postData.append('content', value.content);
    postData.append('image', value.image);
    return this.http
      .post<{ message: string; post: IPost }>(BACKEND_URL, postData)
      .pipe(catchError(this.errorHandler));
  }

  updatePost(post: any) {
    let postData: IPost | FormData;
    const imagePath = post?.image;
    if (typeof imagePath === 'object') {
      postData = new FormData();
      postData.append('id', post?.id);
      postData.append('title', post?.title);
      postData.append('content', post?.content);
      postData.append('image', post?.image);
    } else {
      postData = {
        id: post?.id,
        title: post?.title,
        content: post?.content,
        imagePath: post?.image,
      };
    }
    return this.http
      .put<{ message: string; post: IPost }>(BACKEND_URL + post?.id, postData)
      .pipe(catchError(this.errorHandler));
  }

  deletePost(postId: string) {
    return this.http
      .delete<{ message: string }>(BACKEND_URL + postId)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
