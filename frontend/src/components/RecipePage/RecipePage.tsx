import { useContext, useEffect, useState } from 'react';

import { Recipe } from '../../interfaces/recipeInterfaces';
import './RecipePage.css';
import IngredientList from './IngredientList/IngredientList';
import StepList from './StepList/StepList';
import CommentList from './CommentList/CommentList';
import { formatDate } from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneRecipe, deleteRecipe } from '../../services/recipeService';
import { UserDetailsContext, UserTokenContext } from '../../contexts/userContext';
import { isString } from '../../validations/signupValidation';
import { useTranslation } from 'react-i18next';

const RecipePage = () => {
  const { t } = useTranslation('translation', {keyPrefix: 'recipePage'});

  const user = useContext(UserDetailsContext);
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
      'mealCategory': [],
      'user': {'username': ''},
      'date': '',
      'likes': 0,
      'comments': [],
      'likedBy': []
    },
  );

  useEffect(() => {
    if (isString(recipeId) && token) {
      getOneRecipe(token, recipeId)
        .then((recipe) => {
          setRecipeData(recipe);
        })
        .catch((error) => console.log(error));
    }
  }, [token, recipeId]);

  if (!recipeData.id) {
    return;
  }

  const recipeDeletion = async () => {
    try {
      const confirmed = window.confirm(t('deleteConfirmation'));
    
      if (confirmed) {
        await deleteRecipe(recipeData.id, token);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='recipe-page-content'>
      <button className='recipe-page-back-button' onClick={() => navigate(-1)}>{t('back') }</button>
      <div className='recipe-details'>
        <div className='recipe-image-box'>
          <h1 className='recipe-title'>{recipeData.title}</h1>
          <img className='recipe-image' src={recipeData.image} />
        </div>
        <h3 className='recipe-details-h3'>{t('publishedBy')} {recipeData.user.username} {formatDate(recipeData.date) }</h3>
        <div className='recipe-description'>
          {recipeData.description}
        </div>
        {user.username === recipeData.user.username && <button onClick={recipeDeletion} className='recipe-delete-button'> {t('deleteRecipe') }</button>}
      </div>
      <div className='recipe-instructions'>
        <IngredientList ingredients={recipeData.ingredients} t={t} />
        <StepList steps={recipeData.steps} t={t} />
        <CommentList id={recipeData.id} comments={recipeData.comments} t={t} />
      </div>
    </div>
  );
};

export default RecipePage;