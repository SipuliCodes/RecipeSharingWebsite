import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useState, useEffect, useContext } from 'react';

import './RecipeCard.css';
import { RecipeCardProps } from '../../../../interfaces/props';
import { UserDetailsContext, UserTokenContext } from '../../../../contexts/userContext';
import { likeRecipe } from '../../../../services/recipeService';


const RecipeCard = ({ title, image, likes, id, likedBy, t }: RecipeCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [frontendLikes, setFrontendLikes] = useState(likes);
  const userDetails = useContext(UserDetailsContext);
  const token = useContext(UserTokenContext);

  useEffect(() => {
    if (userDetails.id && likedBy) {
      if (likedBy.includes(userDetails.id)) {
        setLiked(true);
      }
    }
  }, [likedBy, userDetails.id]);

  const onClick = () => {
    navigate(`/recipe/${id}`);
  };

  const onLikeClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setLiked(!liked);
    likeRecipe(id, !liked, token);
    if (liked) {
      setFrontendLikes(frontendLikes - 1);
    }
    if (!liked) {
      setFrontendLikes(frontendLikes + 1);
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
          <FontAwesomeIcon id='like-button' onClick={onLikeClick} className='recipe-like-heart' icon={heartIcon}/>
          <h3 id='likes' className='recipe-likes'>{frontendLikes} {t('recipeList.recipeCard.likes') }</h3>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;