import { Router, Request, Response } from 'express';

import { toLikeRecipe, toNewRecipe } from '../utils/requestValidations';
import  recipeService from '../services/recipeService';

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
  try {
    if (req.decodedToken?.id) {
      const newRecipe = toNewRecipe(req.body);
      recipeService.addRecipe(newRecipe)
        .then((addedRecipe) => res.json(addedRecipe))
        .catch((error) => console.log(error));
    } else {
      res.status(401).end();
    } 
  } catch (error) {
    res.status(401).end();
  }
});

router.delete('/:id', (req, res) => {
  try {
    if (req.decodedToken?.id) {
      const recipeToDeleteId = req.params.id;
      recipeService.deleteRecipe(recipeToDeleteId, req.decodedToken.username)
        .then((response) => { if (response) { res.status(204).end(); } else { res.status(401).end(); } })
        .catch((error) => console.log(error));
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(401).end();
  }
});

router.put('/like/:id', (req, res) => {
  try {
    if (req.decodedToken?.id) {
      const recipeToLike = toLikeRecipe(req.body);
      const id = req.params.id;
      const { likes, likedBy } = recipeToLike;
      recipeService.likeRecipe({ id, likes, likedBy })
        .then((likedRecipe) => res.json(likedRecipe))
        .catch((error) => (console.log(error)));
    } else { res.status(401).end(); }
  } catch (error) {
    res.status(401).end();
  }
});

export default router;
