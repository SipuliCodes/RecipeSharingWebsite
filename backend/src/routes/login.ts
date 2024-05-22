import { Router } from "express";

import userService from "../services/userService";
import { createToken } from "../utils/token";
import { toLoginUser } from "../utils/requestValidations";

const router: Router = Router();

router.post("/", (req, res) => {
  try {
    const loginUser = toLoginUser(req.body);

    userService
      .loginUser(loginUser)
      .then((user) => {
        const token = createToken(user.username, user.id);
        res.json({ user, token });
      })
      .catch((_error) => {
        res.status(401).end();
      });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
