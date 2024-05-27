import { useState } from 'react';

import './Recipe.css';
import { RecipeProps } from '../../../../interfaces/props';

const returnDate = (date: Date): string => {
  const correctFormt = (value: number): string => {
    if (value < 10) {
      return '0' + value;
    }
    return value.toString();
  };
  return `${correctFormt(date.getHours())}:${correctFormt(date.getMinutes())} ${correctFormt(date.getDate())}.${correctFormt(date.getMonth())}.${date.getFullYear()}`;
};

const Recipe = ({ title, image, description, username, likes, date }: RecipeProps) => {
  const [isOverview, setIsOverview] = useState(true);

  return (
    <>
      {isOverview ?
        <div className='recipe-grid'>
          <div className='recipe-details'>

            <div>
              <h1 className='recipe-h1'>{title}</h1>
              <h3 className='recipe-h3'>by {username} </h3>
            </div>
            <p className='recipe-description'>{description}</p>
          </div>
          <img className='recipe-pic' src={image} />
          <div className='recipe-button-bar'>
            <h3 className='recipe-likes'>{likes} likes</h3>
            <button className='recipe-button'>Like</button>
            <button className='recipe-button'>Share</button>
            <button onClick={() => setIsOverview(!isOverview)} className='recipe-button'>Steps and ingredients</button>
            <h3 className='recipe-time'>{returnDate(date)}</h3>
          </div>
        </div>
        : <div>

        </div>}
    </>
  );
};

export default Recipe;