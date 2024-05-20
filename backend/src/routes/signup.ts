/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import userService from "../services/userService";
import { IUser } from "../interfaces/userInterfaces";

const router: Router = Router();

router.get('/', (_req, res) => {
  res.send('signup');
});

router.post('/', (req, res)  => {
  const { firstName, lastName, username, email, password } = req.body;
  userService.addUser({
    firstName,
    lastName,
    username,
    email,
    password
  }).then((addedUser: IUser) => {
    res.json(addedUser);
  }).catch((error) => {
    console.log(error);
  });
  
});

export default router;