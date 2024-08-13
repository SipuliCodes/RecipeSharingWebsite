import { Router, Request, Response } from 'express';
import multer from "multer";

import { toLiked, toNewRecipe, toComment } from '../utils/requestValidations';
import  recipeService from '../services/recipeService';
import mongoose from 'mongoose';

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req: Request, res: Response) => {
  try {
    const user: string = req.query.user as string;
    const filter: string = req.query.filter as string;
    const searchWord: string = req.query.searchWord as string;

    if (!user) {
      recipeService.getAllRecipes(filter, searchWord)
        .then((recipes) => res.json(recipes))
        .catch((error) => console.log(error));
    } else {
      recipeService.getAllRecipesFromUser(user)
        .then((recipes) => res.json(recipes))
        .catch((error) => console.log(error));
    }
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
    const newRecipeRequest = toNewRecipe(req.body);
    const newRecipe = {
      ...newRecipeRequest,
      user: new mongoose.Types.ObjectId(req.decodedToken!.id),
      comments: [],
      likes: 0,
      likedBy: [],
      date: new Date().toISOString()
    };
    const userId = req.decodedToken!.id;
    recipeService.addRecipe(newRecipe, userId)
      .then((addedRecipe) => res.json(addedRecipe))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.delete('/:id', (req, res) => {
  try {
      const recipeToDeleteId = req.params.id;
      recipeService.deleteRecipe(recipeToDeleteId, req.decodedToken!.id)
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
    const userId = req.decodedToken!.id;
    recipeService.commentRecipe({ id, comment, userId })
      .then((newComment) => res.json(newComment))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }

});

router.post("/upload-recipe-pic", upload.single("file"), (req, res) => {
  try {
    const recipeId: string = req.body.recipeId as string;
    const recipeName: string = req.body.recipeName as string;
    const username = req.decodedToken!.username;
    const fileContent = req.file;

    if (fileContent) {
      recipeService
        .uploadPicture(recipeId, recipeName, username, fileContent)
        .then((response) => res.json(response))
        .catch((error) => console.log(error));
    }
  } catch (error) {
    res.status(404).end();
  }
});

export default router;
