import axios from 'axios';

import { config } from '../utils/config';
import { Recipe } from '../interfaces/recipeInterfaces';

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

export {getAllRecipes};