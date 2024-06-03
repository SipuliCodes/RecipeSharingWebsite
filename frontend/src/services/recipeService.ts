import axios from 'axios';

import { config } from '../utils/config';
import { Recipe, RecipeFormData } from '../interfaces/recipeInterfaces';

const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>(`${config.apiUrl}/recipes`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const addRecipe = async ( recipe: RecipeFormData): Promise<Recipe> => {
  try {
    const newRecipe = {
      ...recipe,
      likes: 0,
      comments: [],
      username: 'Bertil',
      date: (new Date().toISOString())
    };
    const response = await axios.post<Recipe>(`${config.apiUrl}/recipes`, newRecipe);
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

export {getAllRecipes, addRecipe};