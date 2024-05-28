import './RecipeList.css';
import recipeData from '../../../../recipe_data.json';
import Recipe from './Recipe/RecipeCard';
import { isString } from '../../../utils/validationUtils';

const RecipeList = () => {

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

  return (
    <div className='recipe-list-flex'>
      <h1 className='recipes-h1'>Recipes</h1>
      <div className='recipe-list'>
        {recipeData.map(recipe => <Recipe title={recipe.title} image={recipe.image} description={recipe.description} ingredients={recipe.ingredients} steps={recipe.steps} username={recipe.username} likes={recipe.likes} date={parseDates(recipe.date)} comments={recipe.comments} />)}
      </div>
    </div>
  );
};

export default RecipeList;