echo "Build script"
npm install
cd ..
cd frontend
npm install
npm run build
cp -r dist ../backend
cd ..