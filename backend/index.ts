import express from 'express';

import SignupRouter from './controllers/signup';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/signup', SignupRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});