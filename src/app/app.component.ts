import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Comment } from './comment.model';
import { CommentsService } from './comments.service';
/*
This protfolio is using Angular and Firebase.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
constructor(private formBuilder: FormBuilder, private http: HttpClient, private commentsService: CommentsService) {
    
}

title = 'YuhongPortfolio';
userFeedback = true;
  commentForm = this.formBuilder.group({
    user_name: '',
    user_number: '',
    user_email: '',
    comment_feedback: ''
  });
  interval;
  commentThankyou = false;
  commentNumber = 0;
  loadedComments: Comment[] = [];
  error = null;

  //User wants the feedback
  commentUserFeedbackYes() {
    this.userFeedback = true;  
  }

  //User does not want the feedback
  commentUserFeedbackNo() {
    this.userFeedback = false;
  }


  //Submit comment
  onSubmit() {
    //Get current all comments from Datbase, take the number
    this.commentsService.getComments().subscribe(
      comments => {
        this.loadedComments = comments;
        this.commentNumber = comments.length + 1;
        console.log("l="+comments.length+" n="+this.loadedComments.length);

        //Post current comment to Datbase
        this.commentsService.postComment(this.commentForm.value.user_name, this.commentForm.value.user_number, this.commentForm.value.user_email, this.commentForm.value.comment_feedback);
        
        //Display notification text for 5 seconds
        this.commentThankyou = true;
        this.interval = setInterval(() => {
          this.commentThankyou = false;
          clearInterval(this.interval);
        },5000);
    
        this.commentForm.reset();
      },
      error => {
        this.error = error.message;
        this.commentForm.reset();
      }
    );      
  }
}
