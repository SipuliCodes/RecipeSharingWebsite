/* eslint-disable @typescript-eslint/no-unused-vars */
import './RecipeCard.css';
import { RecipeCardProps } from '../../../../interfaces/props';

const RecipeCard = ({ title, image, description, steps, ingredients, username, likes, date, comments }: RecipeCardProps) => {

  return (
    <div className='recipe-card recipe-grid'>
      <div className='recipe-pic-box'>
        <img className='recipe-pic' src={image} />
      </div>
      <div className='recipe-details-box'>
        <h1 className='recipe-h1'>{title}</h1>
        <h3 className='recipe-likes'>{likes} likes</h3>
      </div>
    </div>
  );
};

export default RecipeCard;