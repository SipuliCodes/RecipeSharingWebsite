echo "Build script"
npm install
cd ..
cd frontend
npm install
VITE_API_URL=http://localhost:3003/ npm run build
cp -r dist ../backend
cd ..