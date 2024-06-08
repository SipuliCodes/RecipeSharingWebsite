import useAutoNavigation from '../../hooks/useAutoNavigation';
import { useContext } from 'react';

import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import './AddRecipe.css';
import AddRecipeForm from './AddRecipeForm/AddRecipeForm';
import { UserTokenContext } from '../../contexts/userContext';

const AddRecipe = () => {
  const token = useContext(UserTokenContext)

  useAutoNavigation('/', token, false);

  return (
    <div className="add-recipe-grid">
      <div className="add-recipe-header">
        <Logo />
      </div>
      <div className="add-recipe-content">
        <AddRecipeForm />
      </div>
      <Footer greenBackground={true} />
    </div>
  );
};

export default AddRecipe;