import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useState, useEffect, useContext } from 'react';

import './RecipeCard.css';
import { RecipeCardProps } from '../../../../interfaces/props';
import { UserDetailsContext, UserTokenContext } from '../../../../contexts/userContext';
import { likeRecipe } from '../../../../services/recipeService';


const RecipeCard = ({ title, image, likes, id, likedBy }: RecipeCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const userDetails = useContext(UserDetailsContext);
  const token = useContext(UserTokenContext);

  useEffect(() => {
    if (likedBy) {
      if (likedBy.includes(userDetails.id)) {
        setLiked(true);
      }
    }
  }, [likedBy]);

  const onClick = () => {
    navigate(`/recipe/${id}`);
  };

  const onLikeClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setLiked(!liked);
    if (!liked) {
      const newLikedBy = likedBy.concat(userDetails.id);
      return likeRecipe(id, likes + 1, newLikedBy, token);
    }
    if (liked) {
      const likeToRemove = likedBy.indexOf(userDetails.id);
      return likeRecipe(id, likes, likedBy.splice(likeToRemove, 1), token);
    }
  };

  const heartIcon = liked ? findIconDefinition({ prefix: 'fas', iconName: 'heart' }) : findIconDefinition({ prefix: 'far', iconName: 'heart' });

  return (
    <div onClick={onClick} className='recipe-card recipe-grid'>
      <div className='recipe-pic-box'>
        <img className='recipe-pic' src={image} />
      </div>
      <div className='recipe-details-box'>
        <h1 className='recipe-h1'>{title}</h1>
        <div className='recipe-like-box'>
          <FontAwesomeIcon onClick={onLikeClick} className='recipe-like-heart' icon={heartIcon}/>
          <h3 className='recipe-likes'>{likes} likes</h3>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;