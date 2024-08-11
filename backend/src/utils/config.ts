import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3003;
const SECRET = process.env.SECRET;
const CONNECTIONSTRING = process.env.CONNECTIONSTRING;
const PROFILEPIC_CONTAINER = process.env.PROFILEPIC_CONTAINER;

export { MONGODB_URI, PORT, SECRET, CONNECTIONSTRING, PROFILEPIC_CONTAINER };