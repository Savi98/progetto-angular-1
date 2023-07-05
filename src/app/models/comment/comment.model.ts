export interface Comment {
  id: number;
  name: string;
  body: string;
  postId: number;
}

export interface NewComment {
  name: string | null;
  email: string | null;
  body: string;
}
