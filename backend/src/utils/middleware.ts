import { Request, Response, NextFunction } from "express";

import { verifyToken } from "./token";

export const extractToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.decodedToken = verifyToken(req);
  } catch (error) {
    console.log(error );
  }

  next();
};