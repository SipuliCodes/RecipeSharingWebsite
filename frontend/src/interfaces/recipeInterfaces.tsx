export type Comment = {
  username: string;
  comment: string;
  date: string;
};

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  username: string;
  likes: number;
  date: Date;
  comments: Comment[];
}
