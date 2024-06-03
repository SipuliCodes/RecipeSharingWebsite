import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import './AddRecipe.css';
import AddRecipeForm from './AddRecipeForm/AddRecipeForm';

const AddRecipe = () => {
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