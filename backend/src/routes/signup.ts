import { Router } from "express";

import userService from "../services/userService";
import { IUser } from "../interfaces/userInterfaces";
import { toNewUser } from '../utils/requestValidations';

const router: Router = Router();

router.get('/', (_req, res) => {
  res.send('signup');
});

router.post('/', (req, res) => {
  try {
    const newUser = toNewUser(req.body);
    
    userService.addUser(newUser).then((addedUser: IUser) => {
    res.json(addedUser);
  }).catch((error) => {
    console.log(error);
  });
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;