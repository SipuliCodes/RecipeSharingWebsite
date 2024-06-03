import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import AddRecipe from './components/AddRecipe/AddRecipe';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
    </>
  )
);

export default router;