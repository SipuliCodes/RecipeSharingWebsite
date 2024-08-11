import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';
import { getAllRecipes, getAllRecipesFromUser } from '../../../services/recipeService';
import { Recipe } from '../../../interfaces/recipeInterfaces';
import { UserDetailsContext, UserTokenContext } from '../../../contexts/userContext';
import { RecipeListProps } from '../../../interfaces/props';

const RecipeList = ({userId, liked, t}: RecipeListProps) => {
  const [recipeData, setRecipeData] = useState<Recipe[]>();

  const navigate = useNavigate();
  const token = useContext(UserTokenContext);
  const currentUser = useContext(UserDetailsContext);

  const [currentFilter, setCurrentFilter] = useState('');
  const filterOptions = [
    { value: '', label: t('recipeList.allRecipes') },
    { value: 'breakfast', label: t('recipeList.breakfast') },
    { value: 'lunch', label: t('recipeList.lunch') },
    { value: 'dinner', label: t('recipeList.dinner') },
    { value: 'snack', label: t('recipeList.snack') },
    { value: 'dessert', label: t('recipeList.dessert') }
  ];

  const handleFilterChange = (filterValue: string) => {
    setCurrentFilter(filterValue);
  };

  useEffect(() => {
    if (token && !userId && !liked) {
      getAllRecipes(token, currentFilter)
        .then(recipes => setRecipeData(recipes))
        .catch(error => console.log(error));
    }
    if (token && userId && !liked) {
      getAllRecipesFromUser(userId, token)
        .then(recipes => setRecipeData(recipes))
        .catch(error => console.log(error));
    }
    if (liked) {
      setRecipeData(currentUser.likedRecipes);
    }

  }, [token, userId, liked, currentUser, currentFilter]);


  if (!recipeData) return <div></div>;

  return (
    <div className='recipe-list-flex'>
      <div className='recipe-list-category-filter-box'>
        <Select
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: '#c9c9c9',
              primary: '#006909',
            },
          })}
          onChange={filter => handleFilterChange(filter!.value)}
          options={filterOptions}
          defaultValue={filterOptions[0]}
          className='recipe-list-category-filter'
        />
      </div>
      <div className='recipe-list'>
        {!userId && !liked &&
          <div onClick={() => navigate('/add-recipe')} className='recipe-card recipe-grid'>
            <FontAwesomeIcon className='add-recipe-icon' icon={findIconDefinition({ prefix: 'fas', iconName: 'image' })} />
            <div className='recipe-details-box'>
              <h1 className='add-recipe-h1 recipe-h1'>{t('recipeList.addRecipe')}</h1>
            </div>
          </div>
        }
        {recipeData.map(recipe => <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} likes={recipe.likes} likedBy={recipe.likedBy} t={t} />)}
      </div>
    </div>
  );
};

export default RecipeList;