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
      res.json([]);
    }
  } catch (error) {
    res.status(404).end();
  }
});

router.post('/send-request', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    const requestUsername: string = req.body.username as string;

    userService.sendFriendRequest(userId, requestUsername)
      .then(() => res.status(204).end())
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.post('/requests', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    const isAccepted: boolean = req.body.isAccepted as boolean;
    const requestUsername: string = req.body.username as string;

    userService.handleFriendRequest(isAccepted, userId, requestUsername)
      .then((answer) => (res.json(answer)))
      .catch(error => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

export default router;