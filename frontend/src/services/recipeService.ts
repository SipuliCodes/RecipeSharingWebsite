import axios from 'axios';

import { config } from '../utils/config';
import { Recipe, RecipeFormData, Comment } from '../interfaces/recipeInterfaces';

const getAllRecipes = async (token: string, filter: string, searchWord: string): Promise<Recipe[]> => {
  try {
    let queryParams = '';

    if (filter) {
      queryParams += `?filter=${filter}`;
    }

    if (searchWord) {
      queryParams += `${queryParams ? '&' : '?'}searchWord=${searchWord}`;
    }
    const response = await axios.get<Recipe[]>(`${config.apiUrl}/recipes${queryParams}`,{ headers: {'Authorization' : `Bearer ${token}`} });
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

const uploadRecipePic = async (
  recipeId: string,
  recipeName: string,
  file: File,
  token: string
): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('recipeName', recipeName);
    formData.append('recipeId', recipeId);

    const response = await axios.post(
      `${config.apiUrl}/recipes/upload-recipe-pic`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
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

const searchForRecipes = async (
  searchWord: string,
  token: string
): Promise<Recipe> => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/recipes/search-recipe?searchword=${searchWord}`,
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

export {getAllRecipes, getAllRecipesFromUser, getOneRecipe, addRecipe, likeRecipe, commentRecipe, deleteRecipe, uploadRecipePic, searchForRecipes};