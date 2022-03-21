import { integer } from "aws-sdk/clients/frauddetector";

export interface Comment {
    user_name: string;
    user_number: string;
    user_email: string;
    comment_feedback: string;
    id?: string;
  }