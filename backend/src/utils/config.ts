import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3003;

export { MONGODB_URI, PORT };