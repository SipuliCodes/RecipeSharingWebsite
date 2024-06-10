import { useState } from 'react';

import { Recipe } from '../../interfaces/recipeInterfaces';
import './RecipePage.css';
import IngredientList from './IngredientList/IngredientList';
import StepList from './StepList/StepList';
import CommentList from './CommentList/CommentList';
import { formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<Recipe>(
    {
      'id': '1',
      'title': 'Spaghetti Carbonara',
      'image': 'https://www.spendwithpennies.com/wp-content/uploads/2023/04/1200-Spaghetti-Carbonara-2-SpendWithPennies.jpg',
      'description': 'Spaghetti Carbonara is a classic Italian pasta dish made with simple, high-quality ingredients. It\'s a creamy, savory delight that combines al dente spaghetti with crispy pancetta, rich eggs, and a blend of Pecorino and Parmesan cheeses. This dish is quick and easy to prepare, making it perfect for a weeknight dinner or a special occasion. Its velvety texture and rich flavors make it a perennial favorite.',
      'ingredients': [
        '200g spaghetti',
        '100g pancetta',
        '2 large eggs',
        '50g Pecorino cheese',
        '50g Parmesan cheese',
        'Freshly ground black pepper',
        'Salt',
        '2 cloves of garlic',
        'Extra virgin olive oil'
      ],
      'steps': [
        'Put a large saucepan of water on to boil.',
        'Finely chop the pancetta, having first removed any rind.',
        'Beat the eggs in a medium bowl, season with a little freshly grated black pepper and set everything aside.',
        'Add the spaghetti to the water and cook according to the pack instructions.',
        'Squash the garlic with the blade of a knife, just to bruise it.',
        'While the spaghetti is cooking, fry the pancetta with the garlic.',
        'Keep the heat hot enough for the pancetta to crisp up, but don\'t allow the garlic to burn.',
        'Remove from the heat and discard the garlic.',
        'Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.',
        'Drain the spaghetti and add it to the pancetta.',
        'Take the pan off the heat and quickly pour in the eggs and cheese. Stir everything together.',
        'Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper.'
      ],
      'username': 'chefjohn',
      'date': '2024-05-25T18:30:00.000Z',
      'likes': 150,
      'comments': [
        {
          'username': 'foodie123',
          'comment': 'Absolutely delicious! A hit with the whole family.',
          'date': '2024-05-25T19:00:00.000Z'
        },
        {
          'username': 'pastalover',
          'comment': 'Simple and easy to follow. Loved it!',
          'date': '2024-05-26T10:15:00.000Z'
        }
      ]
    },
  );

  if (!recipeData) setRecipeData({
    'id': '1',
    'title': 'Spaghetti Carbonara',
    'image': 'https://www.spendwithpennies.com/wp-content/uploads/2023/04/1200-Spaghetti-Carbonara-2-SpendWithPennies.jpg',
    'description': 'Spaghetti Carbonara is a classic Italian pasta dish made with simple, high-quality ingredients. It\'s a creamy, savory delight that combines al dente spaghetti with crispy pancetta, rich eggs, and a blend of Pecorino and Parmesan cheeses. This dish is quick and easy to prepare, making it perfect for a weeknight dinner or a special occasion. Its velvety texture and rich flavors make it a perennial favorite.',
    'ingredients': [
      '200g spaghetti',
      '100g pancetta',
      '2 large eggs',
      '50g Pecorino cheese',
      '50g Parmesan cheese',
      'Freshly ground black pepper',
      'Salt',
      '2 cloves of garlic',
      'Extra virgin olive oil'
    ],
    'steps': [
      'Put a large saucepan of water on to boil.',
      'Finely chop the pancetta, having first removed any rind.',
      'Beat the eggs in a medium bowl, season with a little freshly grated black pepper and set everything aside.',
      'Add the spaghetti to the water and cook according to the pack instructions.',
      'Squash the garlic with the blade of a knife, just to bruise it.',
      'While the spaghetti is cooking, fry the pancetta with the garlic.',
      'Keep the heat hot enough for the pancetta to crisp up, but don\'t allow the garlic to burn.',
      'Remove from the heat and discard the garlic.',
      'Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.',
      'Drain the spaghetti and add it to the pancetta.',
      'Take the pan off the heat and quickly pour in the eggs and cheese. Stir everything together.',
      'Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper.'
    ],
    'username': 'chefjohn',
    'date': '2024-05-25T18:30:00.000Z',
    'likes': 150,
    'comments': [
      {
        'username': 'foodie123',
        'comment': 'Absolutely delicious! A hit with the whole family.',
        'date': '2024-05-25T19:00:00.000Z'
      },
      {
        'username': 'pastalover',
        'comment': 'Simple and easy to follow. Loved it!',
        'date': '2024-05-26T10:15:00.000Z'
      }
    ]
  },
  );

  return (
    <div className='recipe-page-content'>
      <div className='recipe-page-back-button' onClick={() => navigate(-1)}> Back </div>
      <div className='recipe-details'>
        <div className='recipe-image-box'>
          <h1 className='recipe-title'>{recipeData.title}</h1>
          <img className='recipe-image' src={recipeData.image} />
        </div>
        <h3 className='recipe-details-h3'>Published by {recipeData.username} {formatDate(recipeData.date) }</h3>
        <div className='recipe-description'>
          {recipeData.description}
        </div>
      </div>
      <div className='recipe-instructions'>
        <IngredientList ingredients={recipeData.ingredients} />
        <StepList steps={recipeData.steps} />
        <CommentList comments={recipeData.comments} />
      </div>
    </div>
  );
};

export default RecipePage;