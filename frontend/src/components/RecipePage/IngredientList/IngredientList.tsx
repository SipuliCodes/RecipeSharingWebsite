import { IngredientListProps } from '../../../interfaces/props';


const IngredientList = ({ ingredients }: IngredientListProps ) => {
  return (
    <div className='recipe-ingredients-container'>
      <h2 className='recipe-instructions-h2'> Ingredients </h2>
      <ul className='recipe-ingredients-list'>
        {ingredients.map((ingredient) => <li className='recipe-ingredient'>{ingredient}</li>)}
      </ul>
    </div>
  );
};

export default IngredientList;