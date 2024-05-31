export interface Comment {
  username: string;
  comment: string;
  date: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  username: string;
  likes: number;
  date: string;
  comments: Comment[];
}

export type NewRecipe = Omit<Recipe, 'id'>;
