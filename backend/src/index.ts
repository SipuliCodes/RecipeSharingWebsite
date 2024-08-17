import express, { Request} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { MONGODB_URI, PORT } from './utils/config';

import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import recipeRouter from './routes/recipes';
import userRouter from './routes/users';
import testingRouter from './routes/testing';
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

console.log('NODE_ENV:', process.env.NODE_ENV);

app.use(express.static('dist'));

if (process.env.NODE_ENV === 'test') {
  app.use("/api/testing", testingRouter);
}

app.use(express.json());
app.use(cors<Request>());

app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

app.use(extractToken);
app.use('/api/recipes', checkAuthMiddleware, recipeRouter);
app.use('/api/users', checkAuthMiddleware, userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});