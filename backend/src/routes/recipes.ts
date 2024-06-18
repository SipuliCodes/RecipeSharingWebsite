import { Router, Request, Response } from 'express';

import { toLiked, toNewRecipe, toComment } from '../utils/requestValidations';
import  recipeService from '../services/recipeService';

const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    recipeService.getAllRecipes()
      .then((recipes) => res.json(recipes))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const recipeId = req.params.id;
    recipeService.getOneRecipe(recipeId)
      .then((recipe) => res.json(recipe))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  try {
    const newRecipe = toNewRecipe(req.body);
    recipeService.addRecipe(newRecipe)
      .then((addedRecipe) => res.json(addedRecipe))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.delete('/:id', (req, res) => {
  try {
      const recipeToDeleteId = req.params.id;
      recipeService.deleteRecipe(recipeToDeleteId, req.decodedToken!.username)
        .then((response) => { if (response) { res.status(204).end(); } else { res.status(401).end(); } })
        .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.put('/like/:id', (req, res) => {
  try {
      const recipeToLike = toLiked(req.body);
      const userId = req.decodedToken!.id;
      const id = req.params.id;
      const { liked } = recipeToLike;
      recipeService.likeRecipe({ id, liked, userId })
        .then((likedRecipe) => res.json(likedRecipe))
        .catch((error) => (console.log(error)));
  } catch (error) {
    res.status(404).end();
  }
});

router.put('/comment/:id', (req, res) => {
  try {
    const { comment } = toComment(req.body);
    const id = req.params.id;
    const username = req.decodedToken!.username;
    recipeService.commentRecipe({ id, comment, username })
      .then((newComment) => res.json(newComment))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }

});

export default router;
