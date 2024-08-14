import { Router } from 'express';

import { Recipe, User } from '../models';

const router: Router = Router();

router.post("/reset", (_request, response) => {
  Recipe.deleteMany({}).
    then(() => User.deleteMany({})
      .then(() => response.status(204).end())
      .catch(error => console.log(error)))
    .catch(error => console.log(error));
  
});

export default router;
