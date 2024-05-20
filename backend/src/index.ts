import express from 'express';
import mongoose from 'mongoose';

import { MONGODB_URI, PORT } from './utils/config';
import SignupRouter from './routes/signup';

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

app.use('/api/signup', SignupRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});