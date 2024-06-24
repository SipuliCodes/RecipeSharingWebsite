import { Router } from "express";

import userService from "../services/userService";

const router = Router();

router.get('/', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    const searchWord: string = req.query.searchword as string;
    if (searchWord) {
      userService.getAllUsersWithWord(searchWord, userId)
        .then((users) => res.json(users))
        .catch(error => console.log(error));
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(404).end();
  }
});

export default router;