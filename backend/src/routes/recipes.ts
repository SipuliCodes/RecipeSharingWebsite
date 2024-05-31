import { Router } from 'express';

import recipeData from '../../recipe_data.json';
import { toNewRecipe } from '../utils/requestValidations';
import { Recipe } from '../interfaces/recipeInterfaces';

let recipes: Recipe[] = recipeData;

const router: Router = Router();

router.get('/', (_req, res) => {
  res.json(recipes);
});

router.post('/', (req, res) => {
  const newRecipe = toNewRecipe(req.body);

  const id: string = (recipeData.length + 1).toString();
  const addedRecipe: Recipe = {
    ...newRecipe,
    id
  };
  recipes.push(addedRecipe);
  res.json(addedRecipe);
});

router.delete('/:id', (req, res) => {
  const recipeToDeleteId = req.params.id;

  console.log(recipeToDeleteId);
  recipes = recipes.filter(recipe => recipe.id !== recipeToDeleteId);

  res.status(404).end();
});

export default router;
