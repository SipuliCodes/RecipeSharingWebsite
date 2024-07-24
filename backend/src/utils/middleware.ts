import { Request, Response, NextFunction } from "express";

import { verifyToken } from "./token";

export const extractToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.decodedToken = verifyToken(req);
  } catch (error) {
    console.error("Error verifying token:", error);
  }
  next();
};

export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.decodedToken?.id) {
    next();
  } else {
    res.status(401).end();
  }
};
