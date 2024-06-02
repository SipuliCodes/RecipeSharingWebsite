import Footer from '../Footer/Footer';
import './AddRecipe.css';
import AddRecipeForm from './AddRecipeForm/AddRecipeForm';

const AddRecipe = () => {
  return (
    <div className="add-recipe-grid">
      <div className="add-recipe-header">
        <h1>Add recipe</h1>
      </div>
      <div className="add-recipe-content">
        <AddRecipeForm />
      </div>
      <Footer greenBackground={true} />
    </div>
  );
};

export default AddRecipe;