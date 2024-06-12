import './RecipeCard.css';
import { RecipeCardProps } from '../../../../interfaces/props';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ title, image, likes, id }: RecipeCardProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div onClick={onClick} className='recipe-card recipe-grid'>
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