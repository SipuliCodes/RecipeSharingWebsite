import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';
import { getAllRecipes } from '../../../services/recipeService';
import { Recipe } from '../../../interfaces/recipeInterfaces';
import { UserTokenContext } from '../../../contexts/userContext';

const RecipeList = () => {
  const [recipeData, setRecipeData] = useState<Recipe[]>();
  const navigate = useNavigate();
  const token = useContext(UserTokenContext);

  useEffect(() => {
    if (token) {
      getAllRecipes(token)
        .then(recipes => setRecipeData(recipes))
        .catch(error => console.log(error));
    }
  }, [token]);


  if (!recipeData) return <div></div>;

  return (
    <div className='recipe-list-flex'>
      <h1 className='recipes-h1'>Recipes</h1>
      <div className='recipe-list'>
        <div onClick={() => navigate('/add-recipe') } className='recipe-card recipe-grid'>
          <FontAwesomeIcon className='add-recipe-icon' icon={findIconDefinition({ prefix: 'fas', iconName: 'image' })} />
          <div className='recipe-details-box'>
            <h1 className='add-recipe-h1 recipe-h1'>Add recipe</h1>
          </div>
        </div>
        {recipeData.map(recipe => <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} likes={recipe.likes} likedBy={recipe.likedBy} />)}
      </div>
    </div>
  );
};

export default RecipeList;