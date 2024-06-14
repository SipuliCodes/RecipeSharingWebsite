import { Router, Request, Response } from 'express';

import recipeData from '../../recipe_data.json';
import { toNewRecipe } from '../utils/requestValidations';
import { IRecipe } from '../interfaces/recipeInterfaces';
import  recipeService from '../services/recipeService';

let recipes: IRecipe[] = recipeData;

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    if (req.decodedToken?.id) {
      recipeService.getAllRecipes()
        .then((recipes) => res.json(recipes))
        .catch((error) => console.log(error));
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(401).end();
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    if (req.decodedToken?.id) {
      const recipeId = req.params.id;
      recipeService.getOneRecipe(recipeId)
        .then((recipe) => res.json(recipe))
        .catch((error) => console.log(error));
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(401).end();
  }
});

router.post('/', (req, res) => {
  if (req.decodedToken?.id) {
    const newRecipe = toNewRecipe(req.body);

    const id: string = (recipeData.length + 1).toString();
    const addedRecipe: IRecipe = {
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
