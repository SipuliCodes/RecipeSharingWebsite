/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express';

import recipeData from '../../recipe_data.json';

const router: Router = Router();

router.get('/', (_req, res) => {
  res.json(recipeData);
});

router.post('/', (req, res) => {
  const recipe = req.body;
  const id: number = recipeData.length + 1;
  const addedRecipe = {
    ...recipe,
    id
  };
  recipeData.push(addedRecipe);
  res.json(addedRecipe);
});

export default router;
