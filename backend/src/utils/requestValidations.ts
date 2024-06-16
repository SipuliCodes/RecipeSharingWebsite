import { LikeRecipe, NewRecipe } from "../interfaces/recipeInterfaces";
import { LoginUser, NewUser } from "../interfaces/userInterfaces";
import { parseComments, parseDate, parseDescription, parseImage, parseIngredients, parseLikedBy, parseLikes, parseSteps, parseTitle } from "../parsers/recipeParsers";
import { parseEmail, parseFirstName, parseLastName, parsePassword, parseUsername } from "../parsers/userParsers";

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('firstName' in object && 'lastName' in object && 'username' in object && 'email' in object && 'password' in object) {

    const newUser: NewUser = {
      firstName: parseFirstName(object.firstName),
      lastName: parseLastName(object.lastName),
      username: parseUsername(object.username),
      email: parseEmail(object.email),
      password: parsePassword(object.password)
    };

    return newUser;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

export const toLoginUser = (object: unknown): LoginUser => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('username' in object && 'password' in object) {
    const loginUser: LoginUser = {
      username: parseUsername(object.username),
      password: parsePassword(object.password)
    };

    return loginUser;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewRecipe = (object: unknown): NewRecipe => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('title' in object && 'image' in object && 'description' in object && 'ingredients' in object && 'steps' in object && 'username' in object && 'likes' in object && 'date' in object && 'comments' in object && 'likedBy' in object) {
    const newRecipe: NewRecipe = {
      title: parseTitle(object.title),
      image: parseImage(object.image),
      description: parseDescription(object.description),
      ingredients: parseIngredients(object.ingredients),
      steps: parseSteps(object.steps),
      username: parseUsername(object.username),
      likes: parseLikes(object.likes),
      date: parseDate(object.date),
      comments: parseComments(object.comments),
      likedBy: parseLikedBy(object.likedBy)
    };

    return newRecipe;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toLikeRecipe = (object: unknown): LikeRecipe => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "likes" in object &&
    "likedBy" in object
  ) {
    const likeableRecipe: LikeRecipe = {
      likes: parseLikes(object.likes),
      likedBy: parseLikedBy(object.likedBy),
    };

    return likeableRecipe;
  }

  throw new Error("Incorrect data: some fields are missing");
};
