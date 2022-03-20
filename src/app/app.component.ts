import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
/*
This protfolio is using Angular and Firebase.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //item$: Observable<Item[]>;
//private docClient;
interval;
private params = {
    TableName: 'Movies'
};

constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    
}

title = 'YuhongPortfolio';
userFeedback = true;
  commentForm = this.formBuilder.group({
    user_name: '',
    user_number: '',
    user_email: '',
    comment_feedback: ''
  });
  commentThankyou = false;
  commentNumber = 0;
  loadedComments = [];

  commentUserFeedbackYes() {
    this.userFeedback = true;  
  }
  commentUserFeedbackNo() {
    this.userFeedback = false;
  }


  onSubmit() {
    const item = {
      id: 1,
      user_name: this.commentForm.value.user_name, 
      user_number: this.commentForm.value.user_number, 
      user_email: this.commentForm.value.user_email, 
      comment_feedback: this.commentForm.value.comment_feedback 
    };

    // Send Http request
    this.http
      .post(
        'https://yuhongportfolio-default-rtdb.firebaseio.com/comments/comment.json',
        item
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
    this.commentThankyou = true;
    this.interval = setInterval(() => {
      this.commentThankyou = false;
      clearInterval(this.interval);
    },5000)
    
    this.commentForm.reset();
  }

  private fetchPosts() {
    this.http
      .get('https://yuhongportfolio-default-rtdb.firebaseio.com/comments/comment.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              //postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        // ...
        console.log(posts);
        //this.loadedComments = posts;
      });
  }
}
