const url =
  process.env.NODE_ENV === 'production'
    ? 'https://recipesharingwebsite.onrender.com/api'
    : 'http://localhost:3003/api'; 

export const config = {
  apiUrl: url
};