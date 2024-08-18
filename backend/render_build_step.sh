echo "Build script"
npm install
cd ..
cd frontend
npm install
VITE_API_URL=https://recipesharingwebsite.onrender.com/ npm run build
cp -r dist ../backend
cd ..