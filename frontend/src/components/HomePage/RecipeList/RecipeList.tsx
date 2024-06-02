import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';
import { isString } from '../../../validations/signupValidation';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../../services/recipeService';
import { Recipe } from '../../../interfaces/recipeInterfaces';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const [recipeData, setRecipeData] = useState<Recipe[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipes()
      .then(recipes => setRecipeData(recipes))
      .catch(error => console.log(error));
  }, []);

  const isIsoDateString = (value: unknown): boolean => {
    const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
    return isString(value) && isoDateRegex.test(value);
  };

  const parseDates = ( value: unknown) => {
    if (isIsoDateString(value)) {
      if(isString(value))
        return new Date(value);
    }
    throw new Error('Invalid date');
  };

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
        {recipeData.map(recipe => <RecipeCard title={recipe.title} image={recipe.image} description={recipe.description} ingredients={recipe.ingredients} steps={recipe.steps} username={recipe.username} likes={recipe.likes} date={parseDates(recipe.date)} comments={recipe.comments} />)}
      </div>
    </div>
  );
};

export default RecipeList;