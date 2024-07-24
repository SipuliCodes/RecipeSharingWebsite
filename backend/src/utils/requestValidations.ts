import { LikeRecipe, NewRecipeRequest, NewComment } from "../interfaces/recipeInterfaces";
import { LoginUser, NewAndOldPassword, NewUser, NewUserDetails } from "../interfaces/userInterfaces";
import { parseDescription, parseImage, parseIngredients,  parseSteps, parseTitle, parseLiked, parseComment, parseMealCategory } from "../parsers/recipeParsers";
import { parseEmail, parseFirstName, parseLastName, parsePassword, parseUsername } from "../parsers/userParsers";

export const toNewUserDetails = (object: unknown): NewUserDetails => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "firstName" in object &&
    "lastName" in object &&
    "email" in object
  ) {
    const newUserDetails: NewUserDetails = {
      firstName: parseFirstName(object.firstName),
      lastName: parseLastName(object.lastName),
      email: parseEmail(object.email),
    };

    return newUserDetails;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewAndOldPassword = (object: unknown): NewAndOldPassword => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "newPassword" in object &&
    "oldPassword" in object
  ) {
    const newAndOldPassword: NewAndOldPassword = {
      newPassword: parsePassword(object.newPassword),
      oldPassword: parsePassword(object.oldPassword)
    };

    return newAndOldPassword;
  }

  throw new Error("Incorrect data: some fields are missing");
};

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

export const toNewRecipe = (object: unknown): NewRecipeRequest => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('title' in object && 'image' in object && 'description' in object && 'ingredients' in object && 'steps' in object && 'mealCategory' in object) {
    const newRecipe: NewRecipeRequest = {
      title: parseTitle(object.title),
      image: parseImage(object.image),
      description: parseDescription(object.description),
      ingredients: parseIngredients(object.ingredients),
      steps: parseSteps(object.steps),
      mealCategory: parseMealCategory(object.mealCategory)
    };

    return newRecipe;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toLiked = (object: unknown): LikeRecipe => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "liked" in object
  ) {
    const likeableRecipe: LikeRecipe = {
      liked: parseLiked(object.liked),
    };

    return likeableRecipe;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toComment = (object: unknown): NewComment => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("comment" in object) {
    const newComment: NewComment = {
      comment: parseComment(object.comment),
    };

    return newComment;
  }

  throw new Error("Incorrect data: some fields are missing");
};
