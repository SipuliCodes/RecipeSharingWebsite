import { Router, Request, Response } from 'express';

import recipeData from '../../recipe_data.json';
import { toNewRecipe } from '../utils/requestValidations';
import { Recipe } from '../interfaces/recipeInterfaces';

let recipes: Recipe[] = recipeData;

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.decodedToken?.id) {
    res.json(recipes);
  }
  res.status(401).end();
});

router.get('/:id', (req: Request, res: Response) => {
  if (req.decodedToken?.id) {
    const recipeId = req.params.id;
    res.json(recipes.filter((recipe) => recipe.id === recipeId));
  }
  res.status(401).end();
});

router.post('/', (req, res) => {
  if (req.decodedToken?.id) {
    const newRecipe = toNewRecipe(req.body);

    const id: string = (recipeData.length + 1).toString();
    const addedRecipe: Recipe = {
      ...newRecipe,
      id
    };
    recipes.push(addedRecipe);
    res.json(addedRecipe);
  }
  res.status(401).end();
});

router.delete('/:id', (req, res) => {
  const recipeToDeleteId = req.params.id;

  console.log(recipeToDeleteId);
  recipes = recipes.filter(recipe => recipe.id !== recipeToDeleteId);

  res.status(404).end();
});

export default router;
