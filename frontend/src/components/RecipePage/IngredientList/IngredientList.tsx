import { IngredientListProps } from '../../../interfaces/props';


const IngredientList = ({ ingredients, t }: IngredientListProps) => {
  return (
    <div className='recipe-ingredients-container'>
      <h2 className='recipe-instructions-h2'> {t('ingredientList.ingredients')} </h2>
      <ul className='recipe-ingredients-list'>
        {ingredients.map((ingredient, index) => <li key={index} className='recipe-ingredient'>{ingredient}</li>)}
      </ul>
    </div>
  );
};

export default IngredientList;