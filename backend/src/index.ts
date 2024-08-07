import express, { Request} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { MONGODB_URI, PORT } from './utils/config';

import SignupRouter from './routes/signup';
import LoginRouter from './routes/login';
import RecipeRouter from './routes/recipes';
import UserRouter from './routes/users';
import { checkAuthMiddleware, extractToken } from './utils/middleware';

mongoose.set('strictQuery', false);

console.log('connecting to', MONGODB_URI);


if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}


const app = express();
app.use(express.json());
app.use(cors<Request>());
app.use(extractToken);

app.use('/api/signup', SignupRouter);
app.use('/api/login', LoginRouter);
app.use('/api/recipes', checkAuthMiddleware, RecipeRouter);
app.use('/api/users', checkAuthMiddleware, UserRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});