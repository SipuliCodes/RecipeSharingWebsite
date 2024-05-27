import { Comment } from './recipeInterfaces';

export interface FooterProps {
  greenBackground: boolean;
}

export interface RecipeProps {
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

