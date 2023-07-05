import { Comment } from '../comment/comment.model';

export interface Post {
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}

export interface NewPost {
  user_id : string;
  title: string;
  body: string;
}
