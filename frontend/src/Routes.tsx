import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<HomePage />} />
    </>
  )
);

export default router;