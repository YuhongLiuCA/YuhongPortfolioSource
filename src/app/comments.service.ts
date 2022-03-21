import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Comment } from './comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  postComment(user_name: string, user_number: string, user_email: string, comment_feedback: string) {
    const postData: Comment = { 
        user_name: user_name, 
        user_number: user_number, 
        user_email: user_email, 
        comment_feedback: comment_feedback
     };
    this.http
      .post<{ name: string }>(
        'your firebase website',
        postData
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  getComments() {
    return this.http
      .get<{ [key: string]: Comment }>(
        'your firbase website'
      )
      .pipe(
        map(responseData => {
          const commentsArray: Comment[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              commentsArray.push({ ...responseData[key], id: key });
            }
          }
          return commentsArray;
        }),
        catchError(errorRes => {
          // Throw error
          return throwError(errorRes);
        })
      );
  }
}