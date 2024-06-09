import { DecodedToken } from "../../interfaces/tokenInterfaces";

declare global {
  namespace Express {
    export interface Request {
      decodedToken?: DecodedToken | undefined;
    }
  }
}