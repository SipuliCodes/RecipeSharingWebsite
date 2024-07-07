import { Comment, Recipe } from './recipeInterfaces';
import { BasicUser, Friend } from './userInterfaces';

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

type RequestType = 'none' | 'incoming' | 'pending'

export interface FriendCardProps {
  friend: Friend;
  requestType: RequestType;
}

export interface UserResultProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setUsers: React.Dispatch<React.SetStateAction<BasicUser[]>>;
  user: BasicUser;
}

export interface OpenRouteProps {
  element: React.ReactElement;
  token: string;
}

export interface PrivateRouteProps {
  element: React.ReactNode;
  token: string;
}

export interface RecipeListProps {
  userId: string | undefined;
}