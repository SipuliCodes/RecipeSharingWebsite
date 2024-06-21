import { Router } from "express";
import { MongoServerError } from "mongodb";

import userService from "../services/userService";
import { IUser } from "../interfaces/userInterfaces";
import { toNewUser } from "../utils/requestValidations";
import { createToken } from "../utils/token";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("signup");
});

router.post("/", (req, res) => {
  try {
    const newUser = toNewUser(req.body);

    userService
      .addUser(newUser)
      .then((user: IUser) => {
        const token = createToken(user.username, user.id);
        res.json({ user, token });
      })
      .catch((error: unknown) => {
        let errorMessage = "Something went wrong.";
        if (error instanceof MongoServerError) {
          res.status(400).json(error.keyValue);
          return;
        }
        if (error instanceof Error) {
          errorMessage += "Error: " + error.message;
        }
        res.status(400).json(errorMessage);
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
