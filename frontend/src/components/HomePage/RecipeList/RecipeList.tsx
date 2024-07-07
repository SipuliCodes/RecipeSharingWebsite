import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';
import { getAllRecipes, getAllRecipesFromUser } from '../../../services/recipeService';
import { Recipe } from '../../../interfaces/recipeInterfaces';
import { UserTokenContext } from '../../../contexts/userContext';
import { RecipeListProps } from '../../../interfaces/props';
import { LoggedInUser } from '../../../interfaces/userInterfaces';
import { getOneUser } from '../../../services/userService';


const RecipeList = ({userId}: RecipeListProps) => {
  const [recipeData, setRecipeData] = useState<Recipe[]>();
  const [user, setUser] = useState<LoggedInUser>();

  const navigate = useNavigate();
  const token = useContext(UserTokenContext);

  useEffect(() => {
    if (token && !userId) {
      getAllRecipes(token)
        .then(recipes => setRecipeData(recipes))
        .catch(error => console.log(error));
    }
    if (token && userId) {
      getAllRecipesFromUser(userId, token)
        .then(recipes => setRecipeData(recipes))
        .catch(error => console.log(error));
      getOneUser(userId, token)
        .then(user => setUser(user))
        .catch(error => console.log(error));
    }
  }, [token, userId]);


  if (!recipeData) return <div></div>;

  return (
    <div className='recipe-list-flex'>
      <h1 className='recipes-h1'>{user ? `${user.username}'s recipes` : 'Recipes'}</h1>
      <div className='recipe-list'>
        {!userId &&
          <div onClick={() => navigate('/add-recipe')} className='recipe-card recipe-grid'>
            <FontAwesomeIcon className='add-recipe-icon' icon={findIconDefinition({ prefix: 'fas', iconName: 'image' })} />
            <div className='recipe-details-box'>
              <h1 className='add-recipe-h1 recipe-h1'>Add recipe</h1>
            </div>
          </div>
        }
        {recipeData.map(recipe => <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} likes={recipe.likes} likedBy={recipe.likedBy} />)}
      </div>
    </div>
  );
};

export default RecipeList;