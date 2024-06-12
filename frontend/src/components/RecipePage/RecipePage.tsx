import { useContext, useEffect, useState } from 'react';

import { Recipe } from '../../interfaces/recipeInterfaces';
import './RecipePage.css';
import IngredientList from './IngredientList/IngredientList';
import StepList from './StepList/StepList';
import CommentList from './CommentList/CommentList';
import { formatDate } from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneRecipe } from '../../services/recipeService';
import { UserTokenContext } from '../../contexts/userContext';
import { isString } from '../../validations/signupValidation';

const RecipePage = () => {
  const token = useContext(UserTokenContext);
  const recipeId = useParams().id;
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<Recipe>(
    {
      'id': '',
      'title': '',
      'image': '',
      'description': '',
      'ingredients': [],
      'steps': [],
      'username': '',
      'date': '',
      'likes': 0,
      'comments': []
    },
  );

  useEffect(() => {
    if (isString(recipeId)) {
      getOneRecipe(token, recipeId)
        .then((recipe) => {
          setRecipeData(recipe);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  if (!recipeData.id) {
    return;
  }

  return (
    <div className='recipe-page-content'>
      <div className='recipe-page-back-button' onClick={() => navigate(-1)}> Back </div>
      <div className='recipe-details'>
        <div className='recipe-image-box'>
          <h1 className='recipe-title'>{recipeData.title}</h1>
          <img className='recipe-image' src={recipeData.image} />
        </div>
        <h3 className='recipe-details-h3'>Published by {recipeData.username} {formatDate(recipeData.date) }</h3>
        <div className='recipe-description'>
          {recipeData.description}
        </div>
      </div>
      <div className='recipe-instructions'>
        <IngredientList ingredients={recipeData.ingredients} />
        <StepList steps={recipeData.steps} />
        <CommentList comments={recipeData.comments} />
      </div>
    </div>
  );
};

export default RecipePage;