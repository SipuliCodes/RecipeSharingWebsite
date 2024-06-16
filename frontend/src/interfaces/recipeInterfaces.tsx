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
  date: string;
  comments: Comment[];
  likedBy: string[];
}

export type NewRecipe = Omit<Recipe, 'id'>

export type RecipeFormData = Pick<Recipe, 'title' | 'image' | 'description' | 'ingredients' | 'steps' >
