import { Schema, model } from "mongoose";

import { IRecipe, IRecipeDocument } from "../interfaces/recipeInterfaces";
import { Comment } from "../interfaces/recipeInterfaces";

const commentSchema = new Schema<Comment>({
  username: { type: String, required: true },
  date: { type: String, required: true },
  comment: { type: String, required: true },
});

const schema = new Schema<IRecipe>({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  ingredients: { type: [String] },
  steps: { type: [String] },
  username: { type: String },
  likes: { type: Number },
  date: { type: String },
  comments: { type: [commentSchema] },
  likedBy: { type: [String]}
});

schema.set("toJSON", {
  transform: (
    _document,
    returnedObejct: Partial<IRecipeDocument> & { id?: string }
  ) => {
    if (returnedObejct._id) {
      returnedObejct.id = returnedObejct._id.toString();
      delete returnedObejct._id;
    }
    delete returnedObejct.__v;
  },
});

const Recipe = model<IRecipe>("Recipe", schema);

export default Recipe;
