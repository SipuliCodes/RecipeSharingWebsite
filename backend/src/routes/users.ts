import { Router } from "express";

import userService from "../services/userService";
import { toNewUserDetails, toNewAndOldPassword } from "../utils/requestValidations";

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

router.get('/user', (req, res) => {
  try {
    const userId: string = req.query.userId as string;
    userService
      .getUser(userId)
      .then((user) => res.json(user))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.get('/me', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    userService.getUser(userId)
      .then((user) => res.json(user))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.put('/change-user-details', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    const newUserDetails = toNewUserDetails(req.body);

    userService.changeUserDetails(newUserDetails, userId)
      .then(user => res.json(user))
      .catch(error => console.log(error));
  } catch (error) {
    res.status(404).end();
  }
});

router.put('/change-password', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    const newAndOldPassword = toNewAndOldPassword(req.body);
    userService.changePassword(newAndOldPassword, userId)
      .then(success => res.json(success))
      .catch(error => console.log(error));

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

router.post('/remove-friend', (req, res) => {
  try {
    const userId = req.decodedToken!.id;
    const username: string = req.body.username as string;

    userService
      .removeFriend( username, userId)
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