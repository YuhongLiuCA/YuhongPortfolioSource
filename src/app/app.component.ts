import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //item$: Observable<Item[]>;
  private dynamodb;
//private docClient;
private params = {
    TableName: 'Movies'
};
  constructor(private formBuilder: FormBuilder) {
    
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

  commentUserFeedbackYes() {
    this.userFeedback = true;  
    //console.log("f="+this.userFeedback.toString()); 
  }
  commentUserFeedbackNo() {
    this.userFeedback = false;
    //console.log("f="+this.userFeedback.toString());
  }


  async onSubmit() {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    //const collection = collection(this.firestore, 'items');
    console.warn('Your order has been submitted', this.commentForm.value);
    const item = {
      id: 2,
      user_name: this.commentForm.value.user_name, 
      user_number: this.commentForm.value.user_number, 
      user_email: this.commentForm.value.user_email, 
      comment_feedback: this.commentForm.value.comment_feedback 
    };
    var params = {
      Key: {
       "id": {
         N: "1"
        }
      }, 
      TableName: "User"
     };
       AWS.config.credentials = new AWS.Credentials('AKIAYWKDXJBTNM5X3CQN', 'zKvll6tFgcfH83ri+a0A/bSHpJlj7bY3PK10C4Xf', '');
       AWS.config.update({
       region: 'us-west-1'
       });
       var dynamodb = new AWS.DynamoDB();
      var docClient = new AWS.DynamoDB.DocumentClient();
      var aItem;
      var tNumber;
      var self = this;
   
      dynamodb.getItem(params, function(err, data) {
           if (err) {
               console.log("Fail" + JSON.stringify(err));
           } else {
            aItem = data;
            //console.log("Good" + JSON.stringify(data));
            //console.log("Item="+aItem.Item);
            //console.log("UserNumber="+aItem.Item.user_number);
            //console.log("UserNumberValue="+aItem.Item.user_number.S);
            tNumber = parseInt(aItem.Item.user_number.S) + 1;
            self.commentNumber = tNumber;
            self.commentThankyou = true;
            setTimeout(()=>{                           // <<<---using ()=> syntax
              self.commentThankyou = false;
          }, 8000);

            var oneParams = {
              Item: {
                id: {N: "1"},
                user_name: {
                 S: aItem.Item.user_name.S
                }, 
                user_number: {
                 S: tNumber.toString()
                }, 
                user_email: {
                 S: aItem.Item.user_email.S
                }, 
                comment_feedback: {
                 S: aItem.Item.comment_feedback.S
                }
              }, 
              ReturnConsumedCapacity: "TOTAL", 
              TableName: "User",
              ReturnValues: "ALL_OLD"
            };
            dynamodb.putItem(oneParams, function(err, data) {
              if (err) {
                  console.log("Fail" + JSON.stringify(err));
              } else {
                console.log("Good" + JSON.stringify(data));
              }
            });

            var newParams = {
              Item: {
                id: {N: tNumber.toString()},
                user_name: {
                 S: self.commentForm.value.user_name
                }, 
                user_number: {
                 S: self.commentForm.value.user_number.toString()
                }, 
                user_email: {
                 S: self.commentForm.value.user_email
                }, 
                comment_feedback: {
                 S: self.commentForm.value.comment_feedback
                }
              }, 
              ReturnConsumedCapacity: "TOTAL", 
              TableName: "User",
              ReturnValues: "ALL_OLD"
            };
            dynamodb.putItem(newParams, function(err, data) {
              if (err) {
                  console.log("Fail" + JSON.stringify(err));
              } else {
                console.log("Good" + JSON.stringify(data));
              }
            });


           }
      });     

    this.commentForm.reset();
  }
}
