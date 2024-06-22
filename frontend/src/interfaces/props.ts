import { Comment, Recipe } from './recipeInterfaces';

export interface FooterProps {
  greenBackground: boolean;
}

export type RecipeCardProps = Pick<Recipe, 'title' | 'image' | 'likes' | 'id' | 'likedBy'>


export interface SignUpFormProps {
   setLeftContent: React.Dispatch<React.SetStateAction<string>>
}

export interface LoginFormProps {
  setLeftContent: React.Dispatch<React.SetStateAction<string>>;
}

export interface IngredientListProps {
  ingredients: string[];
}

export interface StepListProps {
  steps: string[];
}

export interface StepProps {
  step: string;
}

export interface CommentListProps {
  id: string;
  comments: Comment[];
}
