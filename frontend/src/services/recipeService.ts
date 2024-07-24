import axios from 'axios';

import { config } from '../utils/config';
import { Recipe, RecipeFormData, Comment } from '../interfaces/recipeInterfaces';

const getAllRecipes = async (token: string, filter: string): Promise<Recipe[]> => {
  try {
    const filterRegex = filter ? `?filter=${filter}` : '';
    const response = await axios.get<Recipe[]>(`${config.apiUrl}/recipes${filterRegex}`,{ headers: {'Authorization' : `Bearer ${token}`} });
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const getAllRecipesFromUser = async (user: string, token: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>(`${config.apiUrl}/recipes?user=${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};


const getOneRecipe = async (token: string, id: string): Promise<Recipe> => {
  try {
    const response = await axios.get<Recipe>(`${config.apiUrl}/recipes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const addRecipe = async ( recipe: RecipeFormData, token: string): Promise<Recipe> => {
  try {
    const response = await axios.post<Recipe>(`${config.apiUrl}/recipes`, recipe, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const likeRecipe = async (id: string, liked: boolean, token: string): Promise<Recipe> => {
  try {
    const recipeLikes = {
      liked
    };
    const response = await axios.put<Recipe>(
      `${config.apiUrl}/recipes/like/${id}`,
      recipeLikes,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const commentRecipe = async (id: string, comment: string, token: string): Promise<Comment> => {
  try {
    const newComment = {
      comment
    };
    const response = await axios.put<Comment>(
      `${config.apiUrl}/recipes/comment/${id}`,
      newComment,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const deleteRecipe = async (recipeId: string, token: string) => {
  try {
    await axios.delete(`${config.apiUrl}/recipes/${recipeId}`, { headers: { Authorization: `Bearer ${token}` } });
  }
  catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

export {getAllRecipes, getAllRecipesFromUser, getOneRecipe, addRecipe, likeRecipe, commentRecipe, deleteRecipe};