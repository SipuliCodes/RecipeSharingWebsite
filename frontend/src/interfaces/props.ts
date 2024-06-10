import { Comment } from './recipeInterfaces';

export interface FooterProps {
  greenBackground: boolean;
}

export interface RecipeCardProps {
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
  comments: Comment[];
}
